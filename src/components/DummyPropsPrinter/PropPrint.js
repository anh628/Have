/**
 * @file Recursively prints object properties.
 * @author Julius Diaz Panoriñgan
 */

import React from 'react'

const PropPrint = ({ propName, prop, maxDepth = 1 }) => {
  if (prop === null) {
    // check null before using typeof to check object
    return `${propName}: null`
  } else if (Array.isArray(prop)) {
    // check array before using typeof to check object
    if (maxDepth === 0) {
      return `${propName}: Array`
    } else {
      return (
        <React.Fragment>
          ${`${propName}: Array [`}
          <ul>
            {prop.map((element, index) => (
              <li key={index}>
                <PropPrint
                  propName={index}
                  prop={element}
                  maxDepth={maxDepth - 1} />
              </li>
            ))}
          </ul>
          ]
        </React.Fragment>
      )
    }
  } else if (typeof prop === 'function') {
    // check function before using typeof to check object
    return `${propName}: Function`
  } else if (typeof prop === 'object') {
    if (maxDepth === 0) {
      return `${propName}: Object`
    } else {
      return (
        <React.Fragment>
          {`${propName}: Object {`}
          <ul>
            {Object.keys(prop)
              .sort()
              .map(key => (
                <li key={key}>
                  <PropPrint
                    propName={key}
                    prop={prop[key]}
                    maxDepth={maxDepth - 1} />
                </li>
              ))}
          </ul>
          &#125;
        </React.Fragment>
      )
    }
  } else {
    return `${propName}: ${String(prop)}`
  }
}

export default PropPrint
