import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import classNames from 'classnames'

import categoryQuery from '../queries/categoryQuery.gql'
import LoadingBar from './LoadingBar'

/**
 * Component that represents a single category displayed in the menu, also displays
 * the subcategories, if the provided category has them
 */
class CategoryItem extends Component {
  render() {
    const { data: { category, loading } } = this.props

    const wrapperClasses = classNames(
      'pl5 pr4 vtex-category-item black-90 hover-white hover-bg-black-90',
      {
        'show-arrow': category && category.hasChildren,
      }
    )

    return (
      <div className="h3 w4">
        <LoadingBar loading={loading}>
          <div className={wrapperClasses}>
            <a href={category.href} className="db mt6 no-underline ttu">
              {category.name}
            </a>

            {category.hasChildren && (
              <div className="vtex-category-sub-menu pv6 ph5 br2 br--bottom">
                <ul className="list ma0 pa0 f6">
                  {category.children.map(subCategory => (
                    <li key={subCategory.id} className="lh-copy">
                      <a
                        className="near-black no-underline underline-hover"
                        href={subCategory.href}
                      >
                        {subCategory.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </LoadingBar>
      </div>
    )
  }
}

CategoryItem.propTypes = {
  /** Id of the category */
  id: PropTypes.number.isRequired,
  data: PropTypes.shape({
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      hasChildren: PropTypes.bool.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
}

const options = {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
}

export default graphql(categoryQuery, options)(CategoryItem)
