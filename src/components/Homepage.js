import React, { Component } from 'react'
import tmdb from '../tmdb'
import DocumentTitle from 'react-document-title'
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'

import Cover from './Cover'
import MovieArray from './MovieArray'
import Popular from './Popular'

class Homepage extends Component {
    constructor(props) {
        super(props)

        this.state = {trending: [], recommended: [], listpopular: [], popular: {}}

        tmdb.call("/movie/now_playing", {}, data => {
            this.setState({trending: data.results.slice(0,6)})
        })

        tmdb.call("/movie/top_rated", {}, data => {
            this.setState({recommended: data.results.slice(0,6)})
        })

        tmdb.call("/movie/popular", {}, data => {
            data.results.splice(6)
            this.setState({listpopular: data.results, popular: data.results[5] })
        })
    }

   componentDidMount() {
        let num = 1
        this.timerID = setInterval(() => {
            if (num === 5) {
                num = 0
            } else {
                num++
            }
            this.setState({popular: this.state.listpopular[num]
            })}, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        configureAnchors({offset: -60, scrollDuration: 800})
        return (
            <DocumentTitle title="Track your watchlist">
            <div className="container">
                <Cover/>
                <ScrollableAnchor id={'section1'}>
                    <div>
                        <MovieArray name="now playing" data={this.state.trending}/>
                    </div>
                </ScrollableAnchor>

                {this.state.listpopular[0] && <Popular data={this.state.popular}/>}
                <MovieArray name="top rated" data={this.state.recommended}/>

            </div>
            </DocumentTitle>
        );
    }
}

export default Homepage