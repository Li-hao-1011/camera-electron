class WindowDrag {
  private body?: HTMLBodyElement
  private pageX = 0
  private pageY = 0
  constructor() {
    /*  */
  }

  public run() {
    window.addEventListener('DOMContentLoaded', () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.body = document.querySelector('body')!

      const mouseDown = this.onMouseDown.bind(this)
      this.body.addEventListener('mousedown', mouseDown)
    })
  }

  private onMouseDown(e: MouseEvent) {
    this.pageX = e.pageX
    this.pageY = e.pageY

    const moveMouse = this.onMouseMove.bind(this)
    this.body?.addEventListener('mousemove', moveMouse)

    this.body?.addEventListener('mouseup', () => {
      this.body?.removeEventListener('mousemove', moveMouse)
    })

    this.body?.addEventListener('mouseout', () => {
      this.body?.removeEventListener('mousemove', moveMouse)
    })
  }

  private onMouseMove(e: MouseEvent) {
    const x = e.pageX - this.pageX
    const y = e.pageY - this.pageY
    window.api.drag({ x, y })
  }
}

export default () => {
  const drag = new WindowDrag()

  return { drag }
}
