
// The Card class is implicitly handled by the CARD_DATABASE objects.
// A formal class is not strictly necessary for this structure but could be
// added for more complex card logic in the future. For now, we'll keep it simple.
// We can centralize card-related functions here if needed.

export function calculateCompoundStats(reactionCompound) {
    return reactionCompound.reduce((acc, card) => {
        acc.charge += card.charge;
        acc.damage += card.z;
        return acc;
    }, { charge: 0, damage: 0 });
}
