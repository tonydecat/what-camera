// TODO(make more versatile).
function smoothScrollTo(endScroll){
    function easeInOut(progress){
        return Math.sin(progress * Math.PI - Math.PI / 2) * 0.5 + 0.5;
    }

    var startScroll = window.scrollY;
    var difference = endScroll - startScroll;
    var timing = 500;

    var startTimestamp;

    function animate(timestamp){
        if (!startTimestamp) startTimestamp = timestamp;
        progress = (timestamp - startTimestamp) / timing;

        if (progress < 1){
            window.scrollTo(0, startScroll + easeInOut(progress) * difference);
            window.requestAnimationFrame(animate);
        } else {
            window.scrollTo(0, startScroll + difference);
        }
    }
    window.requestAnimationFrame(animate);
}

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
                'pictures? I don\'t know': 'normal-of',
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
                'action, sports, and adventure': 'values',
                'travel': 'values',
                'landscapes': 'values',
            }
        },
        'values': {
            label: ', and values',
            edges: {
                'specs and buzzwords': 'normal-budget',
                'simplicity': 'normal-budget',
                'versatility': 'normal-budget',
                'small size': 'normal-budget',
                'looking cool': 'normal-budget',
            }
        },
        'pro-budget': {
            label: ', and my budget is',
            edges: {
                '$1500 or less': null,
                '$1500 to $3000': null,
                '$3000 or more': null,
            }
        },
        'normal-budget': {
            label: ', and my budget is',
            edges: {
                '$0': null,
                'less than $200': null,
                '$200 to $500': null,
                '$500 to $1000': null,
                '$1000 to $1500': null,
                '$1500 or more': null,
            }
        },
    },

    RESULTS: {
        X100T: {
            name: 'Fuji X100T',
            mustORs: [
                ['$500 to $1000', '$1000 to $1500'],
                ['an enthusiast', 'a dabbler', 'a hipster'],
                ['mostly photos'],
            ],
            helpfuls: ['travel', 'simplicity', 'looking cool', 'mostly photos', 'a hipster'],
            imageBig: 'img/x100t.jpg',
            specs: [
                React.DOM.h3(null, 'Fuji X100T'),
                React.DOM.h4(null, 'Perfect for: The minimalist or the traveller'),
                React.DOM.p(null, 'The X100T fits an SLR-sized 16MP sensor, a 23mm F2.0 lens, full manual controls, and a hybrid optical/electronic viewfinder into a compact and rugged body, making it perfect for someone who cares more about taking great photos than fumbling with lenses.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Simple, well-thought-out design'),
                    React.DOM.li(null, 'Great image quality'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Video mode isn\'t great'),
                    React.DOM.li(null, 'Limited to a single focal length'),
                ])
            ],
            price: '$1100',
            amazonHref: 'http://www.amazon.com/gp/product/B00NF6ZGY6/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00NF6ZGY6&linkCode=as2&tag=whatcameshoui-20&linkId=GDVQ4QRBPZWXBYT5',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B00NF6ZGY6'
        },
        RX1R: {
            name: 'Sony RX1R II',
            mustORs: [
                ['$1500 or more', '$3000 or more'],
                ['an enthusiast', 'a dabbler', 'a hipster', 'a professional photographer'],
                ['mostly photos', 'a mix of photos and videos'],
            ],
            helpfuls: ['an enthusiast', 'specs and buzzwords', 'travel', 'simplicity', 'mostly photos', 'a mix of photos and videos'],
            imageBig: 'img/rx1rii.jpg',
            specs: [
                React.DOM.h3(null, 'Sony RX1R II'),
                React.DOM.h4(null, 'Perfect for: the rich minimalist or the pro who needs a backup camera'),
                React.DOM.p(null, 'The RX1R II is not cheap, but it packs a huge, 42MP sensor, a high quality 35mm F2 lens, solid video mode, and a lot of features into a tiny body.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Tiny for a full-frame camera'),
                    React.DOM.li(null, 'Pop-up electronic viewfinder'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Limited to a single focal length'),
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
            helpfuls: ['travel', 'simplicity', 'a dabbler', 'a beginner', 'a hipster', '$0'],
            imageBig: 'img/iphone.jpg',
            specs: [
                React.DOM.h3(null, 'Your Smartphone'),
                React.DOM.h4(null, 'Perfect for: the beginner who already has one'),
                React.DOM.p(null, 'Most modern smartphones have great cameras built in. They\'re also smaller, sleeker and more user-friendly than entry-level point-and-shoots. Best of all, you probably already have one in your pocket. If you\'re on a budget we suggest saving your money or putting it towards a new phone, until you\'ve saved up and decided you want to get more serious about photography.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Small'),
                    React.DOM.li(null, 'Easy to use'),
                    React.DOM.li(null, 'You already have one'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Tiny sensor'),
                    React.DOM.li(null, 'Lacks manual controls and optical zoom'),
                ])
            ],
            price: '$0+'
        },
        INSTAX_90: {
            name: 'Fuji Instax Mini 90',
            mustORs: [
                ['less than $200'],
                ['mostly photos', 'pictures? I don\'t know'],
                ['a dabbler', 'a beginner', 'a hipster', 'a gift giver']
            ],
            helpfuls: ['a gift giver', 'a hipster', 'family and friends', 'travel', 'simplicity', 'looking cool'],
            imageBig: 'img/instax90.jpg',
            specs: [
                React.DOM.h3(null, 'Fuji Instax Mini 90'),
                React.DOM.h4(null, 'Perfect for: The fun-lover or the person who has everything'),
                React.DOM.p(null, 'In an age when digital cameras are cheap and pervasive, there\'s something refreshing and satisfying about shooting with an analog camera and being able to hold the result in your hand or post it on the fridge.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'It\'s fun'),
                    React.DOM.li(null, 'Tactile'),
                    React.DOM.li(null, 'Forces you to think about composition'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Film can get pricey'),
                    React.DOM.li(null, 'Resolution is poor compared to a digital camera'),
                ])
            ],
            price: '$140',
            amazonHref: 'http://www.amazon.com/gp/product/B00FR85IRK/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00FR85IRK&linkCode=as2&tag=whatcameshoui-20&linkId=FFRVIZJEKDUKLSRO',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B00FR85IRK'
        },
        GOPRO_HERO4_SESSION: {
            name: 'GoPro Hero4 Session',
            mustORs: [
                ['less than $200'],
                ['mostly videos', 'a mix of photos and videos', 'pictures? I don\'t know'],
            ],
            helpfuls: ['mostly videos', 'action, sports, and adventure'],
            imageBig: 'img/hero4session.jpg',
            specs: [
                React.DOM.h3(null, 'GoPro Hero4 Session'),
                React.DOM.h4(null, 'Perfect for: the thrill-seeker on a budget'),
                React.DOM.p(null, 'GoPro has become synonymous with this type of camera. This entry-level model is a good enough for most and it\'s really small. It doesn\'t have a built in LCD screen but you can wirelessly connect it to your smartphone\'s screen.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Wallet-friendly'),
                    React.DOM.li(null, 'Good video quality'),
                    React.DOM.li(null, 'The smallest GoPro; it\'s tiny'),
                    React.DOM.li(null, 'No external housing needed'),
                    React.DOM.li(null, 'Better sound quality than other GoPros'),
                    React.DOM.li(null, 'WiFi'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Lacks the high framerates and resolution of higher-end GoPros'),
                    React.DOM.li(null, 'No LCD screen'),
                ])
            ],
            price: '$200',
            amazonHref: 'http://www.amazon.com/gp/product/B010H05JMQ/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B010H05JMQ&linkCode=as2&tag=whatcameshoui-20&linkId=OO4FCBVTKEDVGPL4',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B010H05JMQ'
        },
        GOPRO_HERO4_BLACK: {
            name: 'GoPro HERO4 Black',
            mustORs: [
                ['$200 to $500', '$500 to $1000'],
                ['mostly videos', 'a mix of photos and videos'],
            ],
            helpfuls: ['mostly videos', 'action, sports, and adventure'],
            imageBig: 'img/hero4black.jpg',
            specs: [
                React.DOM.h3(null, 'GoPro HERO4 Black'),
                React.DOM.h4(null, 'Perfect for: the thrill-seeker'),
                React.DOM.p(null, 'GoPro\'s flagship. If you don\'t need 4K video go with the cheaper HERO4 Silver, which also has the advantage of a built-in LCD screen.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, '4K video'),
                    React.DOM.li(null, 'Tons of video modes'),
                    React.DOM.li(null, 'Good slow-motion abilities'),
                    React.DOM.li(null, 'WiFi'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'No LCD screen'),
                ])
            ],
            price: '$500',
            amazonHref: 'http://www.amazon.com/gp/product/B00NIYNUF2/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00NIYNUF2&linkCode=as2&tag=whatcameshoui-20&linkId=ZAKPKKL4HOMZEBFX',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B00NIYNUF2'
        },
        EM10II: {
            customArticle: 'an ',
            name: 'Olympus OM-D E-M10 II',
            mustORs: [
                ['$500 to $1000', '$1500 or less'],
            ],
            helpfuls: ['travel', 'specs and buzzwords', 'an enthusiast', 'a dabbler', 'a hipster', 'a gift giver', 'small size', 'versatility', 'mostly photos', 'a mix of photos and videos'],
            imageBig: 'img/em10ii.jpg',
            specs: [
                React.DOM.h3(null, 'Olympus OM-D E-M10 II'),
                React.DOM.h4(null, 'Perfect for: the budding photographer or the size-and-price-concious enthusiast'),
                React.DOM.p(null, 'This is the Interchangeable lens camera we recommend for most non-pros. It\'s small, easy to use, has great image stabilization built-in, and there are lots of high quality, compact micro four-thirds lenses available.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, '5-Axis Image Stabilization'),
                    React.DOM.li(null, 'Interchangeable lenses'),
                    React.DOM.li(null, 'Good electronic Viewfinder'),
                    React.DOM.li(null, 'WiFi'),
                    React.DOM.li(null, 'Fast autofocus')
                ])
            ],
            price: '$550 (body-only)',
            amazonHref: 'http://www.amazon.com/gp/product/B016LM4EE8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B016LM4EE8&linkCode=as2&tag=whatcameshoui-20&linkId=7QTNNWWJSQKGAG3J',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B016LM4EE8'
        },
        D750: {
            name: 'Nikon D750',
            mustORs: [
                ['$1500 or more', '$1500 to $3000'],
            ],
            helpfuls: ['a professional photographer', 'an enthusiast', 'specs and buzzwords', 'mostly photos', 'sports or wildlife', 'versatility'],
            imageBig: 'img/d750.jpg',
            specs: [
                React.DOM.h3(null, 'Nikon D750'),
                React.DOM.h4(null, 'Perfect for: the enthusiast or the pro'),
                React.DOM.p(null, 'If you want to jump up to full-frame, this is the first camera you should consider. It\'s got a great sensor, good ergonomics, and a very refined design—Nikon has been doing this for a long time.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, '24MP Full-Frame Sensor'),
                    React.DOM.li(null, 'Great controls and ergonomics'),
                    React.DOM.li(null, 'Very capable and well-rounded'),
                    React.DOM.li(null, 'WiFi'),
                ])
            ],
            price: '$1900 (body-only)',
            amazonHref: 'http://www.amazon.com/gp/product/B0060MVJ1Q/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0060MVJ1Q&linkCode=as2&tag=whatcameshoui-20&linkId=6DUL2D2XZC6W5GTP',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B0060MVJ1Q'
        },
        A7RII: {
            name: 'Sony α7R II',
            mustORs: [
                ['$1500 or more', '$3000 or more'],
                ['a professional photographer', 'an enthusiast'],
            ],
            helpfuls: ['specs and buzzwords', 'a mix of photos and videos', 'small size', 'versatility'],
            imageBig: 'img/a7rii.jpg',
            specs: [
                React.DOM.h3(null, 'Sony α7R II'),
                React.DOM.h4(null, 'Perfect for: the specs-seeker with money to spend'),
                React.DOM.p(null, 'The α7R II is Sony\'s flagship. It\'s got almost everything Nikon and Canon\'s flagship full-frame DSLRs have, minus the mirror, making it much smaller and lighter. They\'ve also thrown in an electronic shutter and in-body stabilization. It\'s not perfect, but cliché as it sounds, this is the future of high-end cameras.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, '42MP back-illuminated full-frame sensor'),
                    React.DOM.li(null, 'Great autofocus'),
                    React.DOM.li(null, 'Built-in stabilization'),
                    React.DOM.li(null, '4K video'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'No optical viewfinder'),
                    React.DOM.li(null, 'Slow burst-mode framerate'),
                    React.DOM.li(null, 'More limited lens selection than Nikon or Canon'),
                ])
            ],
            price: '$3200 (body-only)',
            amazonHref: 'http://www.amazon.com/gp/product/B00ZDWGFR2/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00ZDWGFR2&linkCode=as2&tag=whatcameshoui-20&linkId=C5BFAQP3YSWZGSCA',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B00ZDWGFR2'
        },
        D7200: {
            name: 'Nikon D7200',
            mustORs: [
                ['$1000 to $1500', '$1500 or less'],
                ['mostly photos', 'a mix of photos and videos', 'pictures? I don\'t know']
            ],
            helpfuls: ['mostly photos', 'a professional photographer', 'an enthusiast', 'specs and buzzwords', 'versatility'],
            imageBig: 'img/d7200.jpg',
            specs: [
                React.DOM.h3(null, 'Nikon D7200'),
                React.DOM.h4(null, 'Perfect for: the pro on a budget'),
                React.DOM.p(null, 'Mirrorless cameras may be the new hotness, but for most professional photographers DSLR is still the way to go, especially if you\'ve already built up a collection of lenses. The D7200 is your best option if you can\'t find the cash for full-frame.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Refined'),
                    React.DOM.li(null, 'Well-balanced feature set'),
                    React.DOM.li(null, 'Great controls'),
                    React.DOM.li(null, 'Easy to use'),
                    React.DOM.li(null, 'Compatible with all of your old Nikon lenses'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Much bigger and heavier than it\'s mirrorless rivals'),
                ])
            ],
            price: '$1100 (body-only)',
            amazonHref: 'http://www.amazon.com/gp/product/B00U2W45WA/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00U2W45WA&linkCode=as2&tag=whatcameshoui-20&linkId=6JLJBAGLZKAPWCH7',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B00U2W45WA'
        },
        GH4: {
            name: 'Panasonic LUMIX DMC-GH4',
            mustORs: [
                ['$1000 to $1500', '$1500 or less', '$1500 to $3000'],
                ['mostly videos']
            ],
            helpfuls: ['a professional photographer', 'an enthusiast', 'specs and buzzwords', 'mostly videos'],
            imageBig: 'img/gh4.png',
            specs: [
                React.DOM.h3(null, 'Panasonic LUMIX DMC-GH4'),
                React.DOM.h4(null, 'Perfect for: the videographer'),
                React.DOM.p(null, 'Better video quality than many cameras that cost a lot more, and a decent stills camera to boot.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Excellent video quality'),
                    React.DOM.li(null, '4K'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Other options are better for stills at this price range'),
                ])
            ],
            price: '$1300 (body-only)',
            amazonHref: 'http://www.amazon.com/gp/product/B00I9GYG8O/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00I9GYG8O&linkCode=as2&tag=whatcameshoui-20&linkId=UNIC3SXVYVUCODGB',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B00I9GYG8O'
        },
        TG4: {
            customArticle: 'an ',
            name: 'Olympus TG-4',
            mustORs: [
                ['$200 to $500'],
                ['mostly photos', 'a mix of photos and videos', 'pictures? I don\'t know']
            ],
            helpfuls: ['mostly photos', 'a mix of photos and videos', 'travel', 'action, sports, and adventure'],
            imageBig: 'img/tg4.png',
            specs: [
                React.DOM.h3(null, 'Olympus Stylus Tough TG-4'),
                React.DOM.h4(null, 'Perfect for: the adventurer or the clumsy one'),
                React.DOM.p(null, 'Finally a waterproof, shockproof camera that takes good pictures.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, 'Waterproof, shockproof, dustproof, etc.'),
                    React.DOM.li(null, 'Fast aperture for a small camera'),
                    React.DOM.li(null, 'WiFi and GPS built-in'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Image quality still not as good as non-waterproof rivals'),
                ])
            ],
            price: '$300',
            amazonHref: 'http://www.amazon.com/gp/product/B00UKV5D4C/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00UKV5D4C&linkCode=as2&tag=whatcameshoui-20&linkId=SEC42E356L24CXO5',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B00UKV5D4C'
        },
        G9X: {
            name: 'Canon PowerShot G9 X',
            mustORs: [
                ['$200 to $500'],
                ['mostly photos', 'a mix of photos and videos', 'pictures? I don\'t know']
            ],
            helpfuls: ['mostly photos', 'a mix of photos and videos', 'travel', 'family and friends', 'landscapes', 'small size', 'a gift giver', 'versatility', 'simplicity'],
            imageBig: 'img/g9x.jpg',
            specs: [
                React.DOM.h3(null, 'Canon PowerShot G9 X'),
                React.DOM.h4(null, 'Perfect for: the beginner who wants to step up from their phone'),
                React.DOM.p(null, 'The PowerShot G9 X is a great camera for the average beginner or anyone who wants a camera that\'s small and simple. Unlike other compact cameras it has large 1 inch sensor, letting it take great photos even in poor lighting. Its 3x optical zoom is much smaller than what\'s offered by many of its competitors but is enough for most people.'),
                React.DOM.ul({className:'result-box__list result-box__list--pros'}, [
                    React.DOM.li(null, '1 inch sensor in a tiny body'),
                    React.DOM.li(null, 'WiFi'),
                ]),
                React.DOM.ul({className:'result-box__list result-box__list--cons'}, [
                    React.DOM.li(null, 'Fairly limited 3x zoom'),
                    React.DOM.li(null, 'Poor battery life'),
                ])
            ],
            price: '$450',
            amazonHref: 'http://www.amazon.com/gp/product/B0167Q140U/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0167Q140U&linkCode=as2&tag=whatcameshoui-20&linkId=U7VSFIYQR3YMWSBV',
            amazonPixel: 'http://ir-na.amazon-adsystem.com/e/ir?t=whatcameshoui-20&l=as2&o=1&a=B0167Q140U'
        },
    },

    displayName: 'App',

    getInitialState: function(){
        return {
            currentState: this.STATES.TITLE,
            choices: [], 
            viewAll: true,
        };
    },

    componentDidMount: function(){
        if (window.location.protocol === 'file:'){
            this.printMissingResults_();
        }
        
        window.setTimeout(function(){
            this.setState({viewAll: true});
        }.bind(this), 50);
    },

    render: function(){
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
            React.DOM.div({className:'title-page__footnote'}, '*Holiday 2015 edition'),
            React.DOM.div({className:'title-page__all-cameras'}, this.maybeRenderAllCameras_()));
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
                        var choicesSoFar = this.state.choices.concat([option]);
                        this.setState({
                            choices: choicesSoFar,
                        });
                    }.bind(this)
                }, option);
            }.bind(this));
        } else {
            var result = this.determineWinner_(this.state.choices);

            // If there was no winner pick one at random.
            if (!result){
                ga('send', 'event', 'noresult', 'noresult', this.state.choices);

                var randomIndex = Math.floor(Math.random() * Object.keys(this.RESULTS).length);
                result = this.RESULTS[Object.keys(this.RESULTS)[randomIndex]];
            }

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
                    React.DOM.div({
                        className:'view-all-suggestions-button',
                        ref:'viewAllButton',
                        onClick: function(evt){
                            ga('send', 'event', 'view-all', 'view-all');
                            this.setState({
                                viewAll: true,
                            });
                            smoothScrollTo(this.refs.viewAllButton.offsetTop);
                        }.bind(this)
                    }, 'VIEW ALL SUGGESTIONS'),
                    this.maybeRenderAllCameras_()));
        }
    },

    renderResultBox_: function(result){
        var buyLink = React.DOM.div({className: 'result-box__price'}, result.price);

        if (result.amazonHref){
            buyLink = React.DOM.div({},
                React.DOM.a({
                    className: 'result-box__price result-box__price--amazon',
                    rel: 'nofollow',
                    href: result.amazonHref
                }, result.price + ' - Buy it on Amazon'),
                React.DOM.img({
                    src: result.amazonPixel,
                    width: '1',
                    height: '1',
                    border: '0',
                    alt: '',
                    style: {
                        border: 'none !important',
                        margin: '0px !important'
                    }
                }, null));
        }

        return [
            React.DOM.div({className: 'result-box__section'},
                React.DOM.img({className: 'result-box__image', src:result.imageBig},null)),
            React.DOM.div({className: 'result-box__section'},
                React.DOM.div({className: 'result-box__specs'}, result.specs, buyLink))
        ];
    },

    maybeRenderAllCameras_: function(){
        if (!this.state.viewAll) return null;

        return Object.keys(this.RESULTS).map(function(cameraKey){
            var camera = this.RESULTS[cameraKey];
            return React.DOM.div({className:'result-box result-box--listitemview'}, this.renderResultBox_(camera));
        }.bind(this));
    },

    handleStartClick_: function(){
        ga('send', 'event', 'start', 'start');
        this.setState({
            currentState: this.STATES.STARTED,
            viewAll: false
        });
    },

    howManyIncluded_: function(choices, items){
        var result = 0;
        // O(n*m). This could be made more efficient, not that it matters for this data.
        items.forEach(function(item){
            if (choices.indexOf(item) >= 0){
                result += 1;
            }
        });
        return result;
    },

    determineWinner_: function(choices){
        var result = null;
        var highestScore = -1;

        Object.keys(this.RESULTS).forEach(function(potentialResultKey){
            var potentialResult = this.RESULTS[potentialResultKey];
            var possible = true;

            potentialResult.mustORs.forEach(function(mustOR){
                if (this.howManyIncluded_(choices, mustOR) === 0){
                    possible = false;
                }
            }.bind(this));

            var score = this.howManyIncluded_(choices, potentialResult.helpfuls);
            if (possible && score > highestScore){
                result = potentialResult;
                highestScore = score;
            }
        }.bind(this));

        return result;
    },

    printMissingResults_: function(){
        var traverse = function(node, soFar){
            Object.keys(node.edges).forEach(function(edge){
                var newSoFar = soFar.concat([edge]);
                if (!node.edges[edge]){
                    if (!this.determineWinner_(newSoFar))
                        console.log(newSoFar);
                } else {
                    traverse(this.NODES[node.edges[edge]], newSoFar);
                }
            }.bind(this));
        }.bind(this);

        traverse(this.NODES.start, []);
    }
});

ReactDOM.render(
    React.createElement(App),
    document.querySelector('.app-container')
);
