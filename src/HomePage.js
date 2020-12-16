import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const HomePage = () => {
  const [requestState, setRequestState] = useState('idle')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    setRequestState('pending')

    axios
      .get('https://conduit.productionready.io/api/articles')
      .then(res => res.data.articles)
      .then(setArticles)
      .then(() => setRequestState('success'))
      .catch(err => {
        setRequestState('failed')
        console.error(err)
      })
  }, [])

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {requestState === 'pending' ? (
                <h2>Loading...</h2>
              ) : (
                articles.map(article => {
                  return (
                    <div className="article-preview">
                      <div className="article-meta">
                        <a href="profile.html">
                          <img src={article.author.image} />
                        </a>
                        <div className="info">
                          <a href="" className="author">
                            {article.author.username}
                          </a>
                          <span className="date">{article.createdAt}</span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                          <i className="ion-heart"></i> {article.favoritesCount}
                        </button>
                      </div>
                      <a href="" className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>
                      </a>
                    </div>
                  )
                })
              )}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
