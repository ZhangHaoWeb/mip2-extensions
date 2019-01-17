const { CustomElement, util } = MIP

const STYLE_ATTRS = [
  'display',
  'font-size',
  'color'
]

export default class MIPLink extends CustomElement {
  /**
   * 判断是否禁止缓存
   *
   * @returns {boolean} no cache
   */
  isNoCache () {
    let cacheMeta = document.querySelector('meta[property="mip:use_cache"]')
    return cacheMeta && cacheMeta.getAttribute('content') === 'no'
  }

  /**
   * 获取元素css样式
   *
   * @param {string} style string of style like 'display'
   * @returns {?string} css style
   */
  getCssStyle (style) {
    let defaultView = document && document.defaultView
    let css = defaultView && defaultView.getComputedStyle(this.element, null)
    return css && css[style]
  }

  build () {
    let el = this.element
    el.setAttribute('pageType', this.isNoCache() ? 2 : 1)

    let tagA = document.createElement('a')
    let href = el.getAttribute('href') || ''
    tagA.setAttribute('href', href)
    tagA.setAttribute('mip-link', '')

    // 子元素添加到 a 标签下面
    for (let child of [...el.childNodes]) {
      tagA.appendChild(child)
    }
    el.appendChild(tagA)

    util.css(tagA, {
      margin: '0',
      padding: '0',
      width: '100%'
    })

    for (let i = 0; i < STYLE_ATTRS.length; i++) {
      let key = STYLE_ATTRS[i]
      let val = this.getCssStyle(key)
      if (val && val !== '0px') {
        util.css(tagA, key, val)
        util.css(el, key, val)
      }
    }
  }
}
