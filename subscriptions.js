/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrainings = /* GraphQL */ `
  subscription OnCreateTrainings(
    $filter: ModelSubscriptionTrainingsFilterInput
  ) {
    onCreateTrainings(filter: $filter) {
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
export const onUpdateTrainings = /* GraphQL */ `
  subscription OnUpdateTrainings(
    $filter: ModelSubscriptionTrainingsFilterInput
  ) {
    onUpdateTrainings(filter: $filter) {
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
export const onDeleteTrainings = /* GraphQL */ `
  subscription OnDeleteTrainings(
    $filter: ModelSubscriptionTrainingsFilterInput
  ) {
    onDeleteTrainings(filter: $filter) {
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
export const onCreateMembers = /* GraphQL */ `
  subscription OnCreateMembers($filter: ModelSubscriptionMembersFilterInput) {
    onCreateMembers(filter: $filter) {
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
export const onUpdateMembers = /* GraphQL */ `
  subscription OnUpdateMembers($filter: ModelSubscriptionMembersFilterInput) {
    onUpdateMembers(filter: $filter) {
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
export const onDeleteMembers = /* GraphQL */ `
  subscription OnDeleteMembers($filter: ModelSubscriptionMembersFilterInput) {
    onDeleteMembers(filter: $filter) {
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
export const onCreateHands = /* GraphQL */ `
  subscription OnCreateHands($filter: ModelSubscriptionHandsFilterInput) {
    onCreateHands(filter: $filter) {
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
export const onUpdateHands = /* GraphQL */ `
  subscription OnUpdateHands($filter: ModelSubscriptionHandsFilterInput) {
    onUpdateHands(filter: $filter) {
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
export const onDeleteHands = /* GraphQL */ `
  subscription OnDeleteHands($filter: ModelSubscriptionHandsFilterInput) {
    onDeleteHands(filter: $filter) {
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
