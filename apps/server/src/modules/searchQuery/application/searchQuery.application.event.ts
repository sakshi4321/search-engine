export namespace SearchQueryApplicationEvent {
  export namespace SearchQueryCreated {
    export const key = 'searchQuery.application.searchQuery.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
