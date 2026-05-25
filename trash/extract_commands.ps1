$output = @()
$baseDir = "e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본\ERB\指導関係"

for ($i = 0; $i -le 92; $i++) {
    $filename = Join-Path $baseDir ("COMF{0}.ERB" -f $i)
    if (Test-Path $filename) {
        $content = Get-Content $filename -Encoding UTF8 -TotalCount 15
        $printlLine = $content | Where-Object { $_ -match '^\s*PRINTL\s+(.+)$' } | Select-Object -First 1
        if ($printlLine -match '^\s*PRINTL\s+(.+)$') {
            $commandName = $matches[1].Trim()
            $output += "COM$i : $commandName"
        } else {
            $output += "COM$i : [NOT FOUND]"
        }
    } else {
        $output += "COM$i : [FILE NOT FOUND]"
    }
}

$outputFile = "e:\ERA\AV간편개조\erAV_Ho_0.022(간편개조) - 복사본\command_names.txt"
$output | Out-File -FilePath $outputFile -Encoding UTF8
Write-Host "Extraction complete. Found $($output.Count) commands."
