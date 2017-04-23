export interface Identity {
    name: string
    email: string
}

export interface Status {
    initialized: boolean
    locked: boolean
    autolock_at?: string
    version: string
}

export interface SecretEntry {
    id: string
    name: string
    type: string
    tags: string[]
    urls: string[]
    timestamp: string
    deleted: boolean
}

export interface SecretList {
    all_tags: string[]
    entries: SecretEntry[]
}

export interface PasswordStrength {
    entropy: number
    crackTime: number
    crackTimeDisplay: string
    scope: number
}

export interface SecretVersion {
    name: string
    tags: string[]
    urls: string[]
    timestamp: string
    properties: { [name: string]: string }
    deleted: boolean
}

export interface Secret {
    id: string
    type: string
    current: SecretVersion
    versions: SecretVersion[]
    password_strengths: { [name: string]: PasswordStrength }
}