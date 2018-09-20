export const viewsHeight = () => {
  const headerHeight = document.getElementById('back').clientHeight
  const bodyHeight = document.getElementsByTagName('body')[0].clientHeight
  const views = document.getElementById('views')
  views.style.height = `${bodyHeight - headerHeight}px`
}
