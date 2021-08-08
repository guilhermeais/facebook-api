const reactionsTypes = ['like', 'love', 'haha', 'sad', 'angry'] as const

type ReactionsTypes = typeof reactionsTypes[number]

export { reactionsTypes, ReactionsTypes }
