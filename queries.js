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
      myHand_1
      myHand_2
      preflopNotes
      preflopAction
      preflopHeroRange
      preflopVillainRange
      flopNotes
      flopAction
      flopHeroRange
      flopVillainRange
      turnNotes
      turnAction
      turnHeroRange
      turnVillainRange
      riverNotes
      riverAction
      riverHeroRange
      flopCards_1
      flopCards_3
      flopCards_2
      turnCard
      riverCard
      villainPosition
      riverVillainRange
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
        myHand_1
        myHand_2
        preflopNotes
        preflopAction
        preflopHeroRange
        preflopVillainRange
        flopNotes
        flopAction
        flopHeroRange
        flopVillainRange
        turnNotes
        turnAction
        turnHeroRange
        turnVillainRange
        riverNotes
        riverAction
        riverHeroRange
        flopCards_1
        flopCards_3
        flopCards_2
        turnCard
        riverCard
        villainPosition
        riverVillainRange
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;