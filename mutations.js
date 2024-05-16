/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHands = /* GraphQL */ `
  mutation CreateHands(
    $input: CreateHandsInput!
    $condition: ModelHandsConditionInput
  ) {
    createHands(input: $input, condition: $condition) {
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
export const updateHands = /* GraphQL */ `
  mutation UpdateHands(
    $input: UpdateHandsInput!
    $condition: ModelHandsConditionInput
  ) {
    updateHands(input: $input, condition: $condition) {
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
export const deleteHands = /* GraphQL */ `
  mutation DeleteHands(
    $input: DeleteHandsInput!
    $condition: ModelHandsConditionInput
  ) {
    deleteHands(input: $input, condition: $condition) {
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
