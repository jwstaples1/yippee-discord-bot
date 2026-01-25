//well I was going to try to get a skeleton of a command going
//but the discord.js guide does commands differently so I will
//wait to ask wtf is going on here
//this is a learning experience after all
//anyways I'll try to lay out an algo for this command I suppose

/*
The beautiful algorithm for Daily Connor's Quotes
(may expand to others quotes too, would be funny)

1. get list of all quotes
either separately download log of #connors-quotes, clean, tokenize, put into arraylist/linkedlist/something, 1D will prob be fine
or have the bot scrape all chat history from channel, and update upon log-in? or every day/24hrs? idk

2. when command is called, RNG from 0 - quotes.length-1
    2a. if we want to do daily version, either
        2a1. set up a timer to go off at a certain time of day (requires 24/7 uptime, i think) OR
        2a2. keep checking time when on, post quote at designated time of day
    idk which one is better or easier or whatever but anyways

3. grab the quote from the RNGd index

4. make bot say the funny

5. ???

6. profit

the only headache for this (probably) will be figuring out how to get a list of all quotes
but I am also brick central station and forgor how to discord.js
and will need to re-learn for the sake of wanting to do this
*/