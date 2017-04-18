export interface Identity {
    name: string,
    email: string
}

export interface SecretEntry {
    id: string,
    name: string,
    type: string,
    tags: string[],
    urls: string[],
    timestamp: string,
    deleted: boolean
}

export interface SecretList {
    all_tags: string[]
    entries: SecretEntry[]
}

export interface Status {
    initialized: boolean,
    locked: boolean,
    autolock_at?: string,
    version: string
}