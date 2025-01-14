'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type: actionType } = action;

    if (actionType === 'addProperties') {
      const { extraData } = action;

      for (const key in extraData) {
        stateCopy[key] = extraData[key];
      }
    }

    if (actionType === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        if (key in stateCopy) {
          delete stateCopy[key];
        }
      }
    }

    if (actionType === 'clear') {
      for (const key in stateCopy) {
        if (key in stateCopy) {
          delete stateCopy[key];
        }
      }
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
