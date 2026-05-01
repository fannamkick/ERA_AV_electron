const [, , commandKind = 'command', milestone = 'M??', scope = 'unspecified'] = process.argv;

console.error(
  `${commandKind}:${scope} is reserved for ${milestone}, but its real implementation is not written yet. ` +
    'Replace this placeholder with a concrete coverage/gate/smoke implementation before closing that milestone.',
);
process.exit(1);
