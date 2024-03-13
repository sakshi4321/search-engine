export namespace ComponentViewApplicationEvent {
  export namespace ComponentViewCreated {
    export const key = 'componentView.application.componentView.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
