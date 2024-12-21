/*
 * @Date: 2024-12-21 21:01:22
 * @LastEditTime: 2024-12-21 21:01:25
 * @Description: 请填写简介
 */
export default function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};
