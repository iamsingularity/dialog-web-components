/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

function normalize(value: string): string {
  return value.trim().replace(/[^\d+#*]/g, '');
}

export default normalize;
