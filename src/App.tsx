import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

// DON'T save goods to the state

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  render() {
    const {
      isReversed,
      sortType,
    } = this.state;

    const sortedGoods = getReorderedGoods(goodsFromServer, {
      sortType,
      isReversed,
    });

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={sortType === SortType.ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'}
            onClick={() => {
              this.setState({
                sortType: SortType.ALPHABET,
              });
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={sortType === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'}
            onClick={() => {
              this.setState({
                sortType: SortType.LENGTH,
              });
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={isReversed
              ? 'button is-warning'
              : 'button is-warning is-light'}
            onClick={() => {
              this.setState(state => ({
                isReversed: !state.isReversed,
              }));
            }}
          >
            Reverse
          </button>

          {
            (sortType !== SortType.NONE || isReversed) && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  this.setState({
                    sortType: SortType.NONE,
                    isReversed: false,
                  });
                }}
              >
                Reset
              </button>
            )
          }
        </div>
        <ul>
          {
            sortedGoods.map(good => {
              return (
                <li key={good} data-cy="Good">
                  {good}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
