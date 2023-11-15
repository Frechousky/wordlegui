export enum WordleApiCharacterStatus {
  GOOD_POSITION = 0,
  BAD_POSITION = 1,
  NOT_PRESENT = 2
}

export enum WordleApiErrorCode {
  INVALID_GUESS_LENGTH = 100,
  EMPTY_GUESS = 101,
  INVALID_FORMAT = 102,
  GUESS_NOT_IN_WHITELIST = 103
}

export type WordleApiResponse = {
  success?: boolean
  result?: WordleApiCharacterStatus[]
  error?: string
  code?: WordleApiErrorCode
}

export async function postPlayerAttempt(attempt: string, wordLength: number): Promise<Response> {
  const formData = new FormData()
  formData.append('attempt', attempt)
  return fetch(`http://localhost:5000/word/${wordLength}/attempt`, {
    method: 'POST',
    body: formData
  }) as Promise<Response>
} 