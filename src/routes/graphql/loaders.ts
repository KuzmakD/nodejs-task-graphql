import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IPost } from './types.js';
import { type UUID } from 'node:crypto';

export const dataLoaders = (prisma: PrismaClient) => {
  const memberType = new DataLoader(async (memberTypeIds: readonly string[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: [...memberTypeIds] } },
    });

    return memberTypeIds.map((id) =>
      memberTypes.find((memberType) => memberType.id === id),
    );
  });

  const postById = new DataLoader(async (postIds: readonly UUID[]) => {
    const posts = await prisma.post.findMany({
      where: { id: { in: [...postIds] } },
    });

    return postIds.map((id) => posts.find((post) => post.id === id));
  });

  const postsByAuthor = new DataLoader(async (postIds: readonly UUID[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...postIds] } },
    });
    const postsByAuthorId = {} as Record<UUID, IPost[]>;

    posts.forEach((post) => {
      const postsMap = postsByAuthorId;
      const postKey = post.authorId as UUID;
      const postValue = post as IPost;
      postsMap[postKey] = postsMap[postKey]
        ? [...postsMap[postKey], postValue]
        : [postValue];
    });

    return postIds.map((id) => postsByAuthorId[id]);
  });

  const profileById = new DataLoader(async (profileIds: readonly UUID[]) => {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: [...profileIds] } },
    });
    profiles.forEach((profile) => {
      profileByUserId.prime(profile.userId as UUID, profile);
    });

    return profileIds.map((id) => profiles.find((profile) => profile.id === id));
  });

  const profileByUserId = new DataLoader(async (profileIds: readonly UUID[]) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: [...profileIds] } },
    });
    profiles.forEach((profile) => {
      profileById.prime(profile.id as UUID, profile);
    });

    return profileIds.map((id) => profiles.find((profile) => profile.userId === id));
  });

  const userById = new DataLoader(async (userIds: readonly UUID[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...userIds] } },
      include: {
        userSubscribedTo: true,
        subscribedToUser: true,
      },
    });

    return userIds.map((id) => users.find((user) => user.id === id));
  });

  return {
    memberType,
    postById,
    postsByAuthor,
    profileById,
    profileByUserId,
    userById,
  };
};
