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
                'impatient': null,
            }
        },
        'pro-who': {
            label: ' who takes',
            edges: {
                'mostly photos': 'pro-of',
                'mostly videos': 'pro-of',
                'a mix of photos and videos': 'pro-of',
            }
        },
        'normal-who': {
            label: ' who takes',
            edges: {
                'mostly photos': 'normal-of',
                'mostly videos': 'normal-of',
                'a mix of photos and videos': 'normal-of',
            }
        },
        'giftgiver-who': {
            label: ', buying for someone who takes',
            edges: {
                'mostly photos': 'normal-of',
                'mostly videos': 'normal-of',
                'a mix of photos and videos': 'normal-of',
                'I don\'t know': 'normal-of',
            }
        },
        'pro-of': {
            label: ' of',
            edges: {
                'weddings and people': 'pro-budget',
                'sports or wildlife': 'pro-budget',
                'landscapes': 'pro-budget',
                'travel': 'pro-budget',
                'whatever they pay me to shoot': 'pro-budget',
            }
        },
        'normal-of': {
            label: ' of',
            edges: {
                'family and friends': 'values',
                'action and sports': 'values',
                'travel': 'values',
                'landscapes': 'values',
            }
        },
        'values': {
            label: ', and values',
            edges: {
                'specs and features': 'normal-budget',
                'simplicity': 'normal-budget',
                'looking cool': 'normal-budget',
            }
        },
        'pro-budget': {
            label: ', and my budget is',
            edges: {
                'less than $1000': null,
                '$1000 to $2000': null,
                '$2000 to $4000': null,
                '$4000 or more': null,
            }
        },
        'normal-budget': {
            label: ', and my budget is',
            edges: {
                '$0': null,
                'less than $200': null,
                '$200 to $600': null,
                '$600 to $1200': null,
                '$1200 to $2000': null,
                '$2000 or more': null,
            }
        },
    },

    RESULTS: {
        X100T: {
            name: 'Fuji X100T',
            mustORs: [
                ['$600 to $1200', '$1200 to $2000'],
                ['an enthusiast', 'a dabbler', 'a hipster'],
                ['mostly photos'],
            ],
            helpfuls: ['travel', 'simplicity', 'looking cool'],
            imageBig: 'img/x100t.jpg',
            specs: [
                React.DOM.h3(null, 'Fuji X100T'),
                React.DOM.h4(null, 'Perfect for: The minimalist or the traveller'),
                React.DOM.p(null, 'The X100T packs an SLR-sized 16MP sensor, a 23mm F2.0 lens, full manual controls, and a hybrid optical/electronic viewfinder into a compact and rugged body, making it perfect for someone who cares more about taking great photos than fumbling with lenses.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Simple, well-speced and great image quality'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Poor video mode'),
                    React.DOM.li(null, 'Limited to a single focal length'),
                ])
            ],
            price: '$1100'
        },
        RX1R: {
            name: 'Sony RX1R II',
            mustORs: [
                ['$2000 or more'],
                ['an enthusiast', 'a dabbler', 'a hipster'],
                ['mostly photos'],
            ],
            helpfuls: ['travel', 'simplicity', 'looking cool'],
            imageBig: 'img/rx1rii.jpg',
            specs: [
                React.DOM.h3(null, 'Sony RX1R II'),
                React.DOM.h4(null, 'Perfect for: the rich minimalist or the pro who needs a backup'),
                React.DOM.p(null, 'Better video quality than many cameras that cost a lot more.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, '4K video'),
                    React.DOM.li(null, 'Small size'),
                ])
            ],
            price: '$3300'
        },
        PHONE: {
            customArticle: 'nothing. ',
            name: 'I\'ll stick with my phone',
            mustORs: [
                ['less than $200', '$0'],
            ],
            helpfuls: ['travel', 'simplicity', 'a dabbler', 'a beginner', 'a hipster', 'an enthusiast', '$0'],
            imageBig: 'img/iphone.jpg',
            specs: [
                React.DOM.h3(null, 'Your Smartphone'),
                React.DOM.ul(null, [
                    React.DOM.li(null, 'Most modern smartphones have great cameras built in. They\'re also smaller, sleeker and more user-friendly than entry-level point-and-shoots. Best of all, you probably already have one in your pocket. We suggest saving your money or putting it towards a new phone, unless or until you decide you want to get serious about photography.'),
                ])
            ],
            price: '$0+'
        },
        INSTAX_90: {
            name: 'Fuji Instax Mini 90',
            mustORs: [
                ['less than $200'],
                ['mostly photos'],
                ['a dabbler', 'a beginner', 'a hipster', 'a gift giver']
            ],
            helpfuls: ['a gift giver', 'a hipster', 'family and friends', 'travel', 'simplicity', 'looking cool'],
            imageBig: 'img/instax90.jpg',
            specs: [
                React.DOM.h3(null, 'Fuji Instax Mini 90'),
                React.DOM.h4(null, 'Perfect for: The fun-lover or the person who has everything'),
                React.DOM.p(null, 'Instant cameras are far from dead, and the Instax Mini 90 proves it.'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '+ Fun factor; Enables a different, more spontaneous kind of photography'),
                    React.DOM.li(null, '- Film can get pricey'),
                    React.DOM.li(null, '- Resolution is poor compared to even the cheapest digital camera'),
                ])
            ],
            price: '$140'
        },
        GOPRO_HERO_PLUS: {
            name: 'GoPro HERO+',
            mustORs: [
                ['less than $200'],
                ['mostly videos', 'a mix of photos and videos'],
                ['action and sports']
            ],
            helpfuls: ['mostly videos', 'action and sports'],
            imageBig: 'img/heroplus.jpg',
            specs: [
                React.DOM.h3(null, 'GoPro HERO+'),
                React.DOM.h4(null, 'Perfect for: the thrill-seeker on a budget'),
                React.DOM.p(null, '.'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '+ Wallet-friendly'),
                    React.DOM.li(null, '- No LCD screen'),
                    React.DOM.li(null, '- Fewer video modes than higher-end GoPros, making it wo'),
                ])
            ],
            price: '$200'
        },
        GOPRO_HERO4_BLACK: {
            name: 'GoPro HERO4 Black',
            mustORs: [
                ['$200 to $600'],
                ['mostly videos', 'a mix of photos and videos'],
                ['action and sports']
            ],
            helpfuls: ['mostly videos', 'action and sports'],
            imageBig: 'img/hero4black.jpg',
            specs: [
                React.DOM.h3(null, 'GoPro HERO4 Black'),
                React.DOM.h4(null, 'Perfect for: the thrill-seeker'),
                React.DOM.p(null, '.'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '+ 4K video'),
                    React.DOM.li(null, '+ slow mo'),
                    React.DOM.li(null, '- No LCD screen'),
                ])
            ],
            price: '$400-500'
        },
        EM10II: {
            customArticle: 'an ',
            name: 'Olympus OM-D E-M10 II',
            mustORs: [
                ['$200 to $600', '$600 to $1200'],
                ['mostly photos', 'a mix of photos and videos'],
            ],
            helpfuls: ['travel', 'specs and features', 'an enthusiast', 'a dabbler', 'a hipster', 'a gift giver'],
            imageBig: 'img/em10ii.jpg',
            specs: [
                React.DOM.h3(null, 'Olympus OM-D E-M10 II'),
                React.DOM.h4(null, 'Perfect for: the budding photographer or the size-and-price-concious enthusiast'),
                React.DOM.p(null, '.'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '+ 5-Axis Image Stabilization'),
                    React.DOM.li(null, '+ Interchangeable lenses'),
                    React.DOM.li(null, '+ Electronic Viewfinder'),
                    React.DOM.li(null, '+ WiFi'),
                    React.DOM.li(null, '+ Fast autofocus')
                ])
            ],
            price: '$550 (body-only)'
        },
        D750: {
            name: 'Nikon D750',
            mustORs: [
                ['$1200 to $2000', '$2000 or more', '$1000 to $2000'],
            ],
            helpfuls: ['a professional photographer', 'an enthusiast', 'specs and features', 'mostly photos'],
            imageBig: 'img/d750.jpg',
            specs: [
                React.DOM.h3(null, 'Nikon D750'),
                React.DOM.h4(null, 'Perfect for: the enthusiast or the pro'),
                React.DOM.p(null, 'The first full-frame camera you should consider.'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '24MP Full-Frame Sensor'),
                    React.DOM.li(null, 'WiFi'),
                ])
            ],
            price: '$1900 (body-only)'
        },
        A7RII: {
            name: 'Sony α7R II',
            mustORs: [
                ['$2000 or more', '$2000 to $4000'],
                ['a professional photographer', 'an enthusiast'],
            ],
            helpfuls: ['specs and features', 'a mix of photos and videos'],
            imageBig: 'img/a7rii.jpg',
            specs: [
                React.DOM.h3(null, 'Sony α7R II'),
                React.DOM.h4(null, 'Perfect for: the specs-seeking pro with money to spend'),
                React.DOM.p(null, 'The α7R II is Sony\'s flagship'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '42MP back-illuminated full-frame sensor'),
                    React.DOM.li(null, 'Great autofocus, built-in stabilization, 4K video'),
                ])
            ],
            price: '$3200 (body-only)'
        },
        D7200: {
            name: 'Nikon D7200',
            mustORs: [
                ['$1200 to $2000', '$1000 to $2000'],
                ['mostly photos', 'a mix of photos and videos']
            ],
            helpfuls: ['a professional photographer', 'an enthusiast', 'specs and features'],
            imageBig: 'img/d7200.jpg',
            specs: [
                React.DOM.h3(null, 'Nikon D7200'),
                React.DOM.h4(null, 'Perfect for: the enthusiast or the pro'),
                React.DOM.p(null, 'The first full-frame camera you should consider.'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '24MP Full-Frame Sensor'),
                    React.DOM.li(null, 'WiFi'),
                ])
            ],
            price: '$1100 (body-only)'
        },
        GH4: {
            name: 'Panasonic LUMIX DMC-GH4',
            mustORs: [
                ['$1200 to $2000', '$1000 to $2000'],
                ['mostly videos']
            ],
            helpfuls: ['a professional photographer', 'an enthusiast', 'specs and features', 'mostly videos'],
            imageBig: 'img/gh4.png',
            specs: [
                React.DOM.h3(null, 'Panasonic LUMIX DMC-GH4'),
                React.DOM.h4(null, 'Perfect for: the budding videographer'),
                React.DOM.p(null, 'Better video quality than many cameras that cost a lot more.'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '4K video'),
                    React.DOM.li(null, 'Small size'),
                ])
            ],
            price: '$1300 (body-only)'
        },

        TG4: {
            customArticle: 'an',
            name: 'Olympus TG-4',
            mustORs: [
                ['$200 to $600'],
                ['mostly photos', 'a mix of photos and videos']
            ],
            helpfuls: ['mostly photos', 'a mix of photos and videos', 'travel', 'action and sports'],
            imageBig: 'img/tg4.png',
            specs: [
                React.DOM.h3(null, 'Olympus TG-4'),
                React.DOM.h4(null, 'Perfect for: the adventurer or the clumsy one'),
                React.DOM.p(null, 'Waterproof, blah'),
                React.DOM.ul(null, [
                    React.DOM.li(null, '4K video'),
                    React.DOM.li(null, 'Small size'),
                ])
            ],
            price: '$350'
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
                React.DOM.h1(null, 'What camera should I get?*'),
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

        return [startNode.label, ' ', React.DOM.span({className: 'sentence-text__chosen'}, choice)].concat(this.buildSentence_(nextNode, remainingChoices));
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
        
        if (lastNode){
            var options = Object.keys(lastNode.edges);

            var optionEls = options.map(function(option){
                return React.DOM.li({
                    className: 'option-list__option',
                    onClick: function(){
                        ga('send', 'event', 'question', 'answer', option);
                        this.setState({
                            choices: this.state.choices.concat([option])
                        });
                    }.bind(this)
                }, option);
            }.bind(this));
        } else {
            var result = this.determineWinner_();
            ga('send', 'event', 'finish', 'finish', (result && result.name) || 'none');
        }

        if (!result){
            return React.DOM.div({className:'title-page'},
                React.DOM.div({className:'title-page__main title-page__main--tall'},
                    React.DOM.div({className:'sentence-text'}, sentence),
                    React.DOM.ul({className:'option-list'}, optionEls),
                    React.DOM.div({className:'result-box'}, '')));
        } else {
            var resultSentence = ['I should get ', result.customArticle || 'a ', React.DOM.span({className:'sentence-text__result-camera'}, result.name), '.'];

            return React.DOM.div({className:'title-page'},
                React.DOM.div({className:'title-page__main title-page__main--full'},
                    React.DOM.div({className:'sentence-text'}, sentence),
                    React.DOM.div({className:'sentence-text sentence-text--result'}, resultSentence),
                    React.DOM.div({className:'result-box result-box--open'}, this.renderResultBox_(result)),
                    React.DOM.div({
                        className:'restart-button',
                        onClick: function(){
                            ga('send', 'event', 'restart', 'restart');
                            this.setState(this.getInitialState());
                        }.bind(this)
                    }, 'RESTART'),
                    this.renderAllCameras_()));
        }
        
    },

    renderResultBox_: function(result){
        return [
            React.DOM.div({className: 'result-box__section'},
                React.DOM.img({className: 'result-box__image', src:result.imageBig},'')),
            React.DOM.div({className: 'result-box__section'},
                React.DOM.div({className: 'result-box__specs'}, result.specs,
                    React.DOM.div({className: 'result-box__price'}, result.price /*+ ' - Buy it on Amazon'*/)))
        ];
    },

    renderAllCameras_: function(){
        return Object.keys(this.RESULTS).map(function(cameraKey){
            var camera = this.RESULTS[cameraKey];
            return React.DOM.div({className:'result-box result-box--listitemview'}, this.renderResultBox_(camera));
        }.bind(this));
    },

    handleStartClick_: function(){
        ga('send', 'event', 'start', 'start');
        this.setState({currentState: this.STATES.STARTED})
    },

    howManyIncluded_: function(items){
        var choices = this.state.choices;
        var result = 0;
        // O(n*m). This could be made more efficienct, not that it matters for this data.
        items.forEach(function(item){
            if (choices.indexOf(item) >= 0){
                result += 1;
            }
        });
        return result;
    },

    determineWinner_: function(){
        var result = null;
        var highestScore = -1;

        Object.keys(this.RESULTS).forEach(function(potentialResultKey){
            var potentialResult = this.RESULTS[potentialResultKey];
            var possible = true;

            potentialResult.mustORs.forEach(function(mustOR){
                if (this.howManyIncluded_(mustOR) === 0){
                    possible = false;
                }
            }.bind(this));

            var score = this.howManyIncluded_(potentialResult.helpfuls);
            if (possible && score > highestScore){
                result = potentialResult;
                highestScore = score;
            }
        }.bind(this));

        if (!result && window.location.filename !== 'file://'){
            randomIndex = Math.floor(Math.random() * Object.keys(this.RESULTS).length);
            result = this.RESULTS[Object.keys(this.RESULTS)[randomIndex]];
        }

        return result;
    }
});

ReactDOM.render(
    React.createElement(App),
    document.querySelector('.app-container')
);
