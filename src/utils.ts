import { WordleApiCharacterStatus } from "./clients/wordleapi";
import { CharacterStatus } from "./constants";

export function wordleApiCharacterStatusToCharacterStatus(status: WordleApiCharacterStatus): CharacterStatus {
    switch (status) {
        case WordleApiCharacterStatus.WELL_PLACED:
            return CharacterStatus.WELL_PLACED
        case WordleApiCharacterStatus.MISPLACED:
            return CharacterStatus.MISPLACED
        case WordleApiCharacterStatus.NOT_PRESENT:
            return CharacterStatus.NOT_PRESENT
    }
}

export function getTodayYYYYMMDD(): string {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getUTCDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}