export default function filterReducer(state, action) {
  switch (action.type) {
    case 'added_subcategory': {
      return state.find((c) => c.categoryId === action.categoryId)
        ? state.map((item) => {
            if (item.categoryId === action.categoryId) {
              return {
                categoryId: action.categoryId,
                subcategoryIds: [...item.subcategoryIds, action.subcategoryId],
              };
            } else {
              return item;
            }
          })
        : [
            ...state,
            {
              categoryId: action.categoryId,
              subcategoryIds: [action.subcategoryId],
            },
          ];
    }
    case 'removed_subcategory': {
      if (state.length === 1 && state[0].subcategoryIds.length === 1) {
        return [];
      }
      if (
        state.find((x) => x.categoryId === action.categoryId).subcategoryIds
          .length <= 1
      ) {
        return state.filter((x) => x.categoryId !== action.categoryId);
      }
      return state.map((item) => {
        if (item.categoryId === action.categoryId) {
          return item.subcategoryIds.length <= 1
            ? state.filter((x) => x.categoryId !== action.categoryId)
            : {
                ...item,
                subcategoryIds: item.subcategoryIds.filter(
                  (x) => x !== action.subcategoryId
                ),
              };
        } else {
          return item;
        }
      });
    }
    case 'added_category': {
      return [
        ...state,
        {
          categoryId: action.categoryId,
          subcategoryIds: action.subcategoryIds,
        },
      ];
    }
    case 'removed_category': {
      return state.filter((x) => x.categoryId !== action.categoryId);
    }
  }
}
