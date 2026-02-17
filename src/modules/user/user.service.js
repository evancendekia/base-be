// services/user.service.js
import prisma from "../../config/prisma.js";


export const updatePreferences = async (
  userId,
  cmsTopicIds
) => {

  return prisma.$transaction(async (tx) => {

    await tx.userPreference.deleteMany({
      where: { userId },
    });

    await tx.userPreference.createMany({
      data: cmsTopicIds.map(topicId => ({
        userId,
        cmsTopicId: topicId,
      })),
      skipDuplicates: true,
    });

    return tx.user.update({
      where: { id: userId },
      data: {
        preferenceCompleted: true,
      },
      include: {
        preferences: true,
      },
    });

  });

};


export const buildUserResponse = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      preferences: true,
    },
  });

  if (!user) return null;

  const isPremiumActive =
    user.subscription &&
    user.subscription.status === "ACTIVE" &&
    new Date(user.subscription.endDate) > new Date();

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,

    preferenceCompleted: user.preferenceCompleted,

    preferences: user.preferences.map(p => p.cmsTopicId),

    isPremiumActive,

    subscription: user.subscription
      ? {
          planType: user.subscription.planType,
          status: user.subscription.status,
          startDate: user.subscription.startDate,
          endDate: user.subscription.endDate,
        }
      : null,
  };
};