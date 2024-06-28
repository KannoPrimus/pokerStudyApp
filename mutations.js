/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrainings = /* GraphQL */ `
  mutation CreateTrainings(
    $input: CreateTrainingsInput!
    $condition: ModelTrainingsConditionInput
  ) {
    createTrainings(input: $input, condition: $condition) {
      id
      handId
      playerId
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTrainings = /* GraphQL */ `
  mutation UpdateTrainings(
    $input: UpdateTrainingsInput!
    $condition: ModelTrainingsConditionInput
  ) {
    updateTrainings(input: $input, condition: $condition) {
      id
      handId
      playerId
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTrainings = /* GraphQL */ `
  mutation DeleteTrainings(
    $input: DeleteTrainingsInput!
    $condition: ModelTrainingsConditionInput
  ) {
    deleteTrainings(input: $input, condition: $condition) {
      id
      handId
      playerId
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMembers = /* GraphQL */ `
  mutation CreateMembers(
    $input: CreateMembersInput!
    $condition: ModelMembersConditionInput
  ) {
    createMembers(input: $input, condition: $condition) {
      id
      playerId
      memberPlan
      endDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMembers = /* GraphQL */ `
  mutation UpdateMembers(
    $input: UpdateMembersInput!
    $condition: ModelMembersConditionInput
  ) {
    updateMembers(input: $input, condition: $condition) {
      id
      playerId
      memberPlan
      endDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMembers = /* GraphQL */ `
  mutation DeleteMembers(
    $input: DeleteMembersInput!
    $condition: ModelMembersConditionInput
  ) {
    deleteMembers(input: $input, condition: $condition) {
      id
      playerId
      memberPlan
      endDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
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
      stake
      share
      description
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
      stake
      share
      description
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
      stake
      share
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
