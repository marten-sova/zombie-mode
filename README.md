# The Zombie Mode Decision Maker
*An interactive voice assistant built with Google's Dialogflow*

Have you  ever felt so tired after a long day that you don't have the energy to do anything but stare at the wall?

This is a voice user interface app that helps you figure out a good use of your free time when you're in zombie mode.

Here are some sample phrases if you'd like to try it out:  
`I'm tired after a long day and I don't know what to do.`  
`It sure is nice out...`  
`I should probably get back into my hobbies, huh?`  


## Try it here:
https://bot.dialogflow.com/32af40a5-0055-45af-b079-dd569959c7fd  
*The web version is text-chat only.*

# Details 

This voice application, Zombie Mode Decision Maker, addresses a long term problem I have observed in myself and others, often as a result of overwhelming school or work responsibilities.

Your brain has a *decision-making battery* that is only recharged while sleeping. After a certain amount of decisions, especially those that require critical thinking or similar executive function, the ability to make decisions and exercise self-control is significantly degraded.
One simple demonstration of this concept of decision fatigue is the tendency for consumers to make increasingly poor choices in a supermarket as each food item requires scanning through multiple options and choosing the best one.

After a productive day, decision fatigue is in full effect, and selecting an interesting activity to spend your leisure time on becomes impossible. We colloquially call this zombie mode.  A zombie doesn't see the point of engaging in their many interests, doesn't want to plan an outing with friends, and doesn't even want to find a new movie to watch. The zombie isn't incapable of happiness, they just are unable to initiate any steps toward it.

Enter the Zombie Mode Decision Maker. This app has a pool of your favorite activities, with a focus on the enriching ones. It asks a few questions to determine your current zombie level and other soft variables, then chooses an appropriate activity for you to do.


![Zombie Mode](https://github.com/marten-sova/zombie-mode/assets/67399738/4e0c07b3-e9b4-452d-95e6-b56723880d5b)
Intent diagram

## Fulfillment

There are 4 pools of possible activities, categorized as Passive, Hobby, Enriching, and Outdoor. These are represented by 4 terminal intents that will pick one of the possible activities from the respective category, and suggest it to the user, ending the interaction.

### Conversation flow with logic
The welcome message after invocation prompts the user to either pick one of those categories directly, or choose to ask for help making the decision.
Picking a category directly calls the intent for that category.  
Asking for decision-making help begins a decision tree that can lead to any of the 4 terminal intents, depending on the user's responses.

First, the user is prompted to self-report their zombie level as one of (low, medium, high).
A zombie level of (high) is answered with a random Passive Activity.

Next, the user is asked whether they feel obligated to do something productive. If they answer no, the function to give a random Hobby Activity is called.

Next, the assistant asks if the user has been outside today. 
If they admit they haven't, the Random Outdoor Activity generator is called.
If they have already been outside, the only remaining category is Enrichment Activities. However, there is a bonus feature here.
This path makes a random selection of producing an Enrichment Activity or a Hobby Activity.  
The reason for this is that it allows the user to enjoy a hobby completely guilt free, because they expressly said they were willing to do a productive activity, but the zombie assistant gave them permission to do something non-productive instead.
### Backend logic:
The random activities are stored in an array and chosen by generating a random number in the index range.
The 'Help me decide' decision tree is implemented via nested follow-up intents. 

<img width="501" alt="Screenshot 2023-06-04 at 1 59 29 PM" src="https://github.com/marten-sova/zombie-mode/assets/67399738/f315ba18-5325-4b17-9521-7ebfe9aa2e7d">

If the users response leads to one of the 4 terminal intents, it calls the associated cloud function to get a random activity.
Otherwise, the users response leads to the next follow-up intent to ask another question.

## Interaction Model
### Intents:
`HelpDecide` `PassiveActivity` `HobbyActivity` `OutdoorActivity` `EnrichingActivity`
### Parameters:  
ZombieLevel, Custom: Low/Med/High  
Exercised: Yes/No  
Guilt: Yes/No

### Sample *utterances* used to train AI:

HelpDecide:  
1. I don't know
2. I'm not sure
3. You tell me
4. Ask me questions
5. Ask questions
6. Help me choose
7. Help me pick
8. Help me decide
9. Help decide
10. Help choose
11. The latter
12. You choose
13. You pick
14. I have no idea
15. No idea
16. Mega zombie mode
17. I said I'm in zombie mode
18. I don't know what I want
19. Nothing sounds interesting
20. I am just bored
21. I don't care
22. I want to see how a rational decision maker would approach this.
23. You're the decision maker
24. Whatever
25. I can't make any decisions right now.

PassiveActivity:  
1. Passive
2. Passive activity
3. Something passive
4. Easy
 5. Easy activity
6. Something easy
7. Something that doesn't require brainpower
8. Something simple
9. Something chill
10. Simple activity
11. Pick a passive activity
12. Pick an easy activity
13. Pick a simple activity
14. A low effort activity
15. A chill activity
16. The lowest level of activity
17. Whatever is easiest
18. Pick something easy
19. Pick something braindead
20. Something lazy
21. I want to do something easy
22. I want to do something simple
23. I am feeling pretty lazy
24. I want to do something low effort
25. I want to do a passive activity

HobbyActivity:  
1. One of my hobbies
2. Hobby
3. I want to do a hobby
4. I should probably do one of my hobbies
5. I want to get back into a hobby
6. Medium
7. I want to do a medium activity
8. I want to do something sort of interesting
9. How about a hobby
10. How about one of my hobbies
11. How about a medium brainpower activity
12. Something like a video game
13. Maybe a game
14. A nonproductive hobby
15. Pick one of my hobbies
16. Can you pick one of my hobbies
17. Choose one of my hobbies
18. Pick a hobby for me
19. Choose a hobby for me
20. A non-social activity
21. Something I would do if I wasn't in zombie mode
22. Probably a hobby
23. Could you pick one of my hobbies
24. Hobbies
25. A hobby type activity

OutdoorActivity:  
1. Outside
2. Outdoors
3. I want to go outside
4. I want to go outdoors
5. I want to do something outside
6. I want to do something outdoors
7. How about an outside activity
8. How about an outdoor activity
9. Something in the great outdoors
10. Something not inside
11. I want to get some fresh air
12. I want to enjoy the sun
13. I want to go biking or something
14. Something like a walk
15. I want to enjoy the sunshine
16. I want to take advantage of the nice weather
17. Well it is pretty nice out
18. The weather is good so maybe something outside
19. Explore the city
20. I want to be outside
21. I want to be outdoors
22. I want to stretch my legs
23. I am feeling restless
24. I want to get some exercise
25. Something active

EnrichingActivity:  
1. Enrichment
2. Enriching
3. I want to do something enriching
4. Something productive
5. Something enriching
6. I want to do something productive
7. I want to expand my mind
8. Something mentally stimulating
9. Read a book or something
10. A productive indoor activity
11. Something productive indoors
12. A noble activity
13. Something not braindead
14. Something fulfilling
15. One of the activities on my tinder bio
16. Something to make me smarter
17. A good use of time
18. A respectable activity
19. An educational activity
20. I want to do something fulfilling
21. I want to learn something
22. I want to do something I'll be proud of
23. How about an enriching activity
24. How about something pious
25. Pick an enriching activity

## Future Work:
Most of the future work would really go toward clarifying the prompts and expanding the amount of training phrases.  
There are three features I'd have liked to add.  
- [ ] Customizable activity pools – currently its just a hardcoded list of some of my hobbies.
- [ ] Re-roll – get a different activity instead of having to go through the flow again.
- [ ] Coin flip visual – Feedback for the random chance between 'enrichment' and 'hobby'
activity – it should tell the user that they got lucky with a celebratory intro clause or
something.
- [ ] Welcome message – I couldn't get this to work, and the default one didn't work either. I
would like the conversation to start with a brief introduction from the assistant, such as "Hi! You can ask me to help you pick an activity." Instead, I had to put this info into the fallback message, so they get it after typing/speaking anything into the blank chat log.
