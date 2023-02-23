export default function filterReducer(state, action) {
  const isCategoryInList = (categoryId) =>
    state.some((i) => i.categoryId === categoryId);

  const getItemIndex = (categoryId) =>
    state.findIndex((x) => x.categoryId === categoryId);

  const updateSubcategoryIds = (categoryId, subcategoryIds) => {
    return state.map((item) => {
      if (item.categoryId === categoryId) {
        return { ...item, subcategoryIds: subcategoryIds };
      } else {
        return item;
      }
    });
  };

  switch (action.type) {
    case 'added_subcategory': {
      return isCategoryInList(action.categoryId)
        ? updateSubcategoryIds(action.categoryId, [
            ...state[getItemIndex(action.categoryId)].subcategoryIds,
            action.subcategoryId,
          ])
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
      return updateSubcategoryIds(action.categoryId, [
        ...state[getItemIndex(action.categoryId)].subcategoryIds.filter(
          (x) => x !== action.subcategoryId
        ),
      ]);
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
