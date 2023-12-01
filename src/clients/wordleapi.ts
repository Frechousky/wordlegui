export enum WordleApiCharacterStatus {
  WELL_PLACED = 0,
  MISPLACED = 1,
  NOT_PRESENT = 2
}

export enum WordleApiErrorCode {
  INVALID_PAYLOAD = 100,
  ATTEMPT_NOT_IN_WHITELIST = 101
}

export type WordleApiResponse = {
  success?: boolean
  result?: WordleApiCharacterStatus[]
  error?: string
  code?: WordleApiErrorCode
}

export async function postPlayerAttempt(attempt: string, wordLength: number): Promise<Response> {
  const payload = JSON.stringify({ attempt: attempt })
  return fetch(`http://localhost:5000/attempt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  }) as Promise<Response>
} 