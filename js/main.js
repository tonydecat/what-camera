var App = React.createClass({
    STATES: {
        TITLE: 'title',
        QUESTIONS: 'questions',
        RESULT: 'result',
    },

    NODES: {
        start: {
            label: 'I am',
            edges: {
                'a professional photographer': 'pro-who',
                'an enthusiast': 'normal-who',
                'a dabbler': 'normal-who',
                'a beginner': 'normal-who',
                'a hipster': 'normal-who',
                'a gift giver': 'giftgiver-who',
            }
        },
        'pro-who': {
            label: 'who takes',
            edges: {
                'mostly photos': 'pro-of',
                'mostly videos': 'pro-of',
                'a mix of photos and videos': 'pro-of',
            }
        },
        'normal-who': {
            label: 'who takes',
            edges: {
                'mostly photos': 'normal-of',
                'mostly videos': 'normal-of',
                'a mix of photos and videos': 'normal-of',
            }
        },
        'giftgiver-who': {
            label: 'buying for someone who takes',
            edges: {
                'mostly photos': 'normal-of',
                'mostly videos': 'normal-of',
                'a mix of photos and videos': 'normal-of',
                'I don\'t know': 'normal-of',
            }
        },
        'pro-of': {
            label: 'of',
            edges: {
                'weddings and people': 'pro-budget',
                'sports or wildlife': 'pro-budget',
                'landscapes': 'pro-budget',
                'travel': 'pro-budget',
                'whatever they pay me to shoot': 'pro-budget',
            }
        },
        'normal-of': {
            label: 'of',
            edges: {
                'family and friends': 'values',
                'action and sports': 'values',
                'travel': 'values',
                'landscapes': 'values',
            }
        },
        'values': {
            label: 'and values',
            edges: {
                'specs and features': 'normal-budget',
                'simplicity': 'normal-budget',
                'looking cool': 'normal-budget',
            }
        },
        'pro-budget': {
            label: 'and my budget is',
            edges: {
                'less than $1000': null,
                '$1000 to $2000': null,
                '$2000 to $5000': null,
                '$5000 or more': null,
            }
        },
        'normal-budget': {
            label: 'and my budget is',
            edges: {
                '$0': null,
                'less than $200': null,
                '$200 to $600': null,
                '$600 to $1200': null,
                '$1200 or more': null,
            }
        },
    },

    displayName: 'App',

    getInitialState: function(){
        return {
            currentState: this.STATES.TITLE,
            choices: []
        };
    },

    render: function() {
        if (this.state.currentState === this.STATES.TITLE){
            return this.renderTitlePage_();
        } else {
            return this.renderQuestions_();
        }
    },

    renderTitlePage_: function(){
        return React.DOM.div({className:'title-page'},
            React.DOM.div({className:'title-page__main'},
                React.DOM.h1(null, 'What camera should I buy?*'),
                React.DOM.div({
                    className:'title-page__begin',
                    onClick:this.handleStartClick_
                }, 'BEGIN')),
            React.DOM.div({className:'title-page__footnote'}, '*Holiday 2015 edition'));
    },

    buildSentence_: function(startNode, choices){
        if (!startNode) return '.';
        if (choices.length === 0) return startNode.label + '...';

        var choice = choices[0];
        var remainingChoices = choices.slice(1);
        var nextNode = this.NODES[startNode.edges[choice]];

        return startNode.label + ' ' + choice + ' ' + this.buildSentence_(nextNode, remainingChoices);
    },

    // TODO: Combine this with above method.
    getLastNode_: function(startNode, choices){
        if (!startNode) return null;
        if (choices.length === 0) return startNode;

        var choice = choices[0];
        var remainingChoices = choices.slice(1);
        var nextNode = this.NODES[startNode.edges[choice]];

        return this.getLastNode_(nextNode, remainingChoices);
    },

    renderQuestions_: function() {
        var sentence = this.buildSentence_(this.NODES.start, this.state.choices);
        var lastNode = this.getLastNode_(this.NODES.start, this.state.choices);
        
        var options = Object.keys(lastNode.edges);

        var optionEls = options.map(function(option){
            return React.DOM.li({
                className: 'option',
                onClick: function(){
                    this.setState({
                        choices: this.state.choices.concat([option])
                    });
                }.bind(this)
            }, option);
        }.bind(this));

        return React.DOM.div({className:'title-page'},
            React.DOM.div({className:'title-page__main title-page__main--tall'},
                React.DOM.h1(null, sentence),
                React.DOM.ul(null, optionEls)));
    },

    handleStartClick_: function(){
        this.setState({currentState: this.STATES.STARTED})
    }
});

ReactDOM.render(
    React.createElement(App, {name: 'World'}),
    document.querySelector('.app-container')
);
