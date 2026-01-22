#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix COMF11-19 command files in the web-port training module.

This script:
1. Fixes import paths
2. Replaces Korean property names with array indices
3. Extracts helper functions from commented code
4. Fixes CommandPlugin structure
5. Adds undefined checks
"""

import os
import re
from pathlib import Path
from typing import Tuple, List

# Korean property mappings to array indices
KOREAN_PROPS = {
    '종순': '10',
    'V감각': '2',
    'A감각': '3',
    '백옥성': '4',
    '복종': '5',
    '우울증': '6',
    '흥분': '7',
    '거칠기': '8',
    '민감': '9',
    '취향': '11',
}

def read_file(file_path):
    """Read file content."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(file_path, content):
    """Write content to file."""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_imports(content):
    """Fix import paths."""
    # Replace '../../types' with '../../../../types/training'
    content = content.replace("'../../types'", "'../../../../types/training'")
    
    # Remove SourceValues import line
    content = re.sub(
        r"import\s+{\s*[^}]*\bSourceValues\b[^}]*\}\s+from\s+'[^']+';?\n?",
        "",
        content
    )
    
    return content

def replace_korean_properties(content):
    """Replace Korean property names with array indices."""
    for korean, index in KOREAN_PROPS.items():
        # Match patterns like context.status[korean_name]
        pattern = "context\.status\['" + korean + "'\]"
        replacement = "context.status[" + index + "]"
        content = re.sub(pattern, replacement, content)
    return content

def extract_helper_function(content, pattern, func_name):
    """
    Extract a helper function from commented code.
    
    Looks for pattern like "// functionName:" and extracts code until closing brace.
    Returns tuple of (remaining_content, extracted_function).
    """
    # Find the comment marker
    match = re.search(r"//\s*" + pattern + r":", content)
    if not match:
        return content, ""
    
    start_pos = match.start()
    # Find the actual code (after the comment)
    code_start = content.find('\n', start_pos) + 1
    
    # Count braces to find matching closing brace
    brace_count = 0
    in_code = False
    end_pos = code_start
    
    for i in range(code_start, len(content)):
        char = content[i]
        if char == '{':
            brace_count += 1
            in_code = True
        elif char == '}':
            brace_count -= 1
            if in_code and brace_count == -1:
                end_pos = i + 1
                break
    
    if end_pos == code_start:
        return content, ""
    
    # Extract the code block
    extracted = content[code_start:end_pos].strip()
    
    # Create helper function
    helper_func = "\n    " + func_name + "() {\n        " + extracted + "\n    }\n"
    
    # Remove the commented section from content
    remaining = content[:start_pos] + content[end_pos:]
    
    return remaining, helper_func

def fix_command_plugin_structure(content):
    """
    Fix CommandPlugin structure - remove early closing brace.
    """
    # Pattern: class CommandPlugin { ... early } ... }
    # We need to find and merge these
    
    # Find the main class definition
    class_match = re.search(r'class\s+CommandPlugin\s*{', content)
    if not class_match:
        return content
    
    class_start = class_match.end()
    
    # Count braces to find where the class should end
    brace_count = 1
    for i in range(class_start, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                class_end = i
                break
    
    # Extract class content
    class_content = content[class_match.start():class_end + 1]
    
    # Remove any early closing braces before the end
    # Look for patterns like "}" followed by code that should be inside the class
    fixed_class = re.sub(r'}\s*(\s*(?:async\s+)?(?:function|execute|[a-zA-Z_]|constructor))', r'\1', class_content)
    
    return content[:class_match.start()] + fixed_class + content[class_end + 1:]

def add_undefined_checks(content):
    """Add undefined checks for context.items, context.equipment, context.charFlags."""
    
    # Add checks at the start of execute method if not present
    if 'context.items' in content and 'typeof context.items' not in content:
        content = content.replace(
            'context.items',
            '(context.items || [])'
        )
    
    if 'context.equipment' in content and 'typeof context.equipment' not in content:
        content = content.replace(
            'context.equipment',
            '(context.equipment || [])'
        )
    
    if 'context.charFlags' in content and 'typeof context.charFlags' not in content:
        content = content.replace(
            'context.charFlags',
            '(context.charFlags || {})'
        )
    
    return content

def process_file(file_path):
    """
    Process a single COMF file.
    
    Returns the fixed content.
    """
    print("Processing: " + os.path.basename(file_path))
    
    content = read_file(file_path)
    
    # Apply fixes in order
    print("  - Fixing imports...")
    content = fix_imports(content)
    
    print("  - Replacing Korean properties...")
    content = replace_korean_properties(content)
    
    print("  - Extracting helper functions...")
    # Extract calculateSource helper
    content, calculate_helper = extract_helper_function(content, 'calculateSource', 'calculateSource')
    
    # Extract generateMessage helper
    content, message_helper = extract_helper_function(content, 'generateMessage', 'generateMessage')
    
    # Insert helpers into execute method if they were found
    helpers = calculate_helper + message_helper
    if helpers.strip():
        execute_match = re.search(r'(?:async\s+)?execute\s*\(\s*context\s*\)\s*{', content)
        if execute_match:
            insert_pos = execute_match.end()
            content = content[:insert_pos] + helpers + content[insert_pos:]
    
    print("  - Fixing CommandPlugin structure...")
    content = fix_command_plugin_structure(content)
    
    print("  - Adding undefined checks...")
    content = add_undefined_checks(content)
    
    return content

def main():
    """Main function to process all COMF11-19 files."""
    
    base_path = r"/e/ERA/AV간편개조/erAV_Ho_0.022(간편개조) - 복사본/web-port/src/modules/training/commands/commands"
    
    # Check if directory exists
    if not os.path.isdir(base_path):
        print("Error: Directory not found: " + base_path)
        return
    
    # Process COMF11 through COMF19
    for i in range(11, 20):
        file_name = "COMF" + str(i) + ".ts"
        file_path = os.path.join(base_path, file_name)
        
        if not os.path.isfile(file_path):
            print("Warning: File not found: " + file_path)
            continue
        
        try:
            fixed_content = process_file(file_path)
            write_file(file_path, fixed_content)
            print("  - Successfully saved fixed content\n")
        except Exception as e:
            print("  - Error processing file: " + str(e) + "\n")
            continue

if __name__ == '__main__':
    main()
