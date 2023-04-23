function createUnicodeRange(list) {
  const result = [];

  const workflow = [];

  const doWork = () => {
    if (workflow.length === 0) return;

    if (workflow.length > 2) {
      const first = workflow[0];
      const last = workflow[workflow.length - 1];
      result.push(`U+${first.toString(16)}-${last.toString(16)}`);
      workflow.splice(0, workflow.length);
    }

    workflow.forEach((item) => {
      result.push(`U+${item.toString(16)}`);
    });
    workflow.splice(0, workflow.length);
    return;
  };

  for (let i = 0, len = list.length; i < len; i++) {
    const last = workflow[workflow.length - 1];
    if (list[i] !== last + 1) {
      doWork();
    }
    workflow.push(list[i]);
  }

  doWork();

  return result;
}

function unicodeToSubset(unicodes) {
  if (Array.isArray(unicodes)) {
    return unicodes
      .map((code) => {
        return String.fromCharCode(parseInt(code));
      })
      .join('');
  }
  return String.fromCharCode(parseInt(unicodes));
}

function formatFontFamily(input) {
  if (input.indexOf(' ') > -1) return `'${input}'`;
  return input;
}

module.exports = {
  createUnicodeRange,
  unicodeToSubset,
  formatFontFamily,
};
