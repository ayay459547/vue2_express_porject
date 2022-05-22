export default {
  name: 'tableTemplate',
  functional: true,
  props: {
    tableColumns: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    dataList: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  render (createElement, context) {
    const { color, size, element, isBlock, msg, customStyle } = context.props
    return createElement(
      'div', 
      {
        class: 'table-container'
      }, 
      [
        createElement(
          'div', 
          {
          }, 
          'header'
        ),
        createElement(
          'div', 
          {

          }, 
          'body'
        )
      ]
    ) 
  }
}


