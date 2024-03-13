export namespace ComponentApplicationEvent {
  export namespace ComponentCreated {
    export const key = 'component.application.component.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
