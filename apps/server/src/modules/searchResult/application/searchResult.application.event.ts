export namespace SearchResultApplicationEvent {
  export namespace SearchResultCreated {
    export const key = 'searchResult.application.searchResult.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
