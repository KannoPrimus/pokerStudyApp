/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHands = /* GraphQL */ `
  query GetHands($id: ID!) {
    getHands(id: $id) {
      id
      playerId
      tableType
      handTags
      heroPosition
      handTitle
      preflopNotes
      preflopHeroRange
      preflopVillainRange
      flopNotes
      flopHeroRange
      flopVillainRange
      turnNotes
      turnHeroRange
      turnVillainRange
      riverNotes
      riverHeroRange
      riverVillainRange
      flopCards
      turnCard
      riverCard
      villainPosition
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listHands = /* GraphQL */ `
  query ListHands(
    $filter: ModelHandsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerId
        tableType
        handTags
        heroPosition
        handTitle
        preflopNotes
        preflopHeroRange
        preflopVillainRange
        flopNotes
        flopHeroRange
        flopVillainRange
        turnNotes
        turnHeroRange
        turnVillainRange
        riverNotes
        riverHeroRange
        riverVillainRange
        flopCards
        turnCard
        riverCard
        villainPosition
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
