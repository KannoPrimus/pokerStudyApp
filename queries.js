/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRanges = /* GraphQL */ `
  query GetRanges($id: ID!) {
    getRanges(id: $id) {
      id
      palyerId
      rangeId
      title
      range
      colors
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRanges = /* GraphQL */ `
  query ListRanges(
    $filter: ModelRangesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRanges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        palyerId
        rangeId
        title
        range
        colors
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTrainings = /* GraphQL */ `
  query GetTrainings($id: ID!) {
    getTrainings(id: $id) {
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
export const listTrainings = /* GraphQL */ `
  query ListTrainings(
    $filter: ModelTrainingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        handId
        playerId
        score
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMembers = /* GraphQL */ `
  query GetMembers($id: ID!) {
    getMembers(id: $id) {
      id
      playerId
      memberPlan
      endDate
      skipTutorial
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMembersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerId
        memberPlan
        endDate
        skipTutorial
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
      stake
      share
      description
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
        stake
        share
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
