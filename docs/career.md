# BIK (FE + BE + CLOUD + DATA LAYER + IOS)

1. Created the generic channel for BIK its a channel to test out 3rd party apis easily and send broadcasts.
2. Developed all BSP APIs, webhooks, and territory app on firestore for BSP data storage and report generation.
3. Executed a complete implementation of RCS, including single send, template send, template sync, webhooks, broadcasts, and bot management. Ensured RCS templates were compatible with WhatsApp’s template component mapper.
4. Implemented the back-end for template analytics.
5. Implemented a Campaign Health Check feature to abort in-progress campaigns based on real-time customer actions.
6. Developed a scheduled job to fetch phone number quality and status for all stores; created corresponding front-end APIs to render this data in a chart with filters.
7. Implemented campaign abortion logic triggered when a phone number is restricted by Meta.
8. Updated the WhatsApp initial and final cost calculation flow, implementing country-based cost calculations.
9. Developed MM Lite onboarding APIs and adapted the cost calculation infrastructure to support MM Lite messages.
10. Implemented Broadcast Trajectory Analysis.
11. Implemented Campaign Frequency Capping based on Broadcast Trajectory Analysis, including all associated cases (e.g., 'never engage,' bounce segment creation).
12. Implemented IP and domain reputation fetching logic with report generation. Configured automated alerts (via Slack) for ESP blocks and generated IP/domain/volume reputation reports for the product.
13. Developed the full-stack (front-end and back-end) implementation for the Cancel/Retry Broadcast feature, aborting state machines and Cloud Tasks.
14. Resolved a notification redirection issue in the BIK iOS application.
15. Revamped the Shopify Sync Flow, significantly simplifying and structuring the process. This optimization removed multiple state machines, increasing speed and reducing errors.
16. Worked on an infra that targets differnt roles of various clients on various channels (EX LOW CREDDIT ALERT) and keeps track of it etc
17. revamped billing flow for ai charges based on model etc made a dashboard to create and update rate card and client wise markup securely (react redux)
18. made a ui popup infra for both bik and manifest with a dashboard to target popup from any element and track its progresion everything using a common componment library (react redux)
19. implemented segment sorting with a/b testing for a broadcast to sort active customers first using elastic data and comprehensive logic mto amke everything seem seamless
20. HACKATHON: Implemented template creation based on an initial prompt, customer attributes, and other data. Enabled real-time template synchronization and developed APIs and webhooks for the front-end.

# VideoLAN
Designed and implemented multi-file metadata editing subsystem in C++ and Qt, enabling batch editing
capabilities for VLC’s 3 billion users
• Refactored legacy internal APIs to improve code maintainability and extensibility across VLC’s codebase
worked directly with the legend JBK and was mentored by him the only student he mentored that year 
gave him ideas and daily back and froth

# MuseScore 
Developed reusable popup and inline text editing system in C++ and Qt, modernizing notation workflow for
millions of users released in musescore 4.6 as a major feature build an infra for popup widgets taht helped next year gsoc developer
Fixed multiple issues before getting selected for musescore


# open source shi
contributing to github desktop

# for portfolio

## Yt Video
https://www.youtube.com/watch?v=osbhREvPkYM&t=7040s a yt video 2 hours long of me and musescore's lead dev rebasing a really old feature branch

https://www.youtube.com/watch?v=QAinITDdpW8
a video of me teaching people how to setup musescore's dev env on a machine

## Research Paper

Coloc - College Off-campus Accommodation Finder 
ABSTRACT: This study examines how home conditions affect students' educational experiences through an analysis of Student Housing Facilities and Accommodations (SHFA) at a state college. Student-residents 404 in number from hostels in college and boarding houses participated in a survey using the Student Residential Satisfaction (SRS) paradigm. The data were analyzed using an index formula, frequency, and percentage. The results indicated a preference for off-campus shared rooms priced at 1000 pesos or lower. Although housing facilities had different construction styles, the SHFA compliance index was typically low. Location, accessibility, amenities, and hospitality were highly rated, while hygiene, tidiness, safety, and protection received low ratings. The study suggests a new method for selecting roommates by utilizing the Gale-Shapley algorithm and Elo Rating System to enhance compatibility and living conditions gradually. The research proposes improvements for roommate matching services and highlights the importance of institutions and local governments in enhancing student housing and well-being, despite some constraints.
https://www.ijfmr.com/research-paper.php?id=22355
https://www.semanticscholar.org/paper/Coloc-College-Off-campus-Accommodation-Finder-Verma-Ahuja/cfecef9ab485fde8b0f0d6120568155872b49f46

## tech blogs
1. Developing VLC Media Player for Windows with Docker: A Step-by-Step Guide
Hirnaymay Bhaskar
Hirnaymay Bhaskar
https://octopols.medium.com/developing-vlc-for-windows-with-docker-a-step-by-step-guide-06417ad803bd

2. GSoC 2024 with VideoLAN 
https://octopols.medium.com/gsoc-2024-with-videolan-cb4799d54086

3. Musescore Text Style Popup Final Blog

GSoC 2023 - Text Style Popup
Posted 2 years ago
During my participation in the Google Summer of Code (GSoC) program, I had the privilege of collaborating with the MuseScore team on an exciting project known as the Text Style Popup. This project aimed to enhance the text editing experience in MuseScore by adding most of the text properties to a popup that hovers over the text, providing a seamless and intuitive editing process.
See my proposal for further details

Code Changes
My contributions to the project can be seen in the following pull request:

Pull Request (ocotopol/textStyleWidget)

This pull request includes several commits tha represent the incremental progress made during the development of the Text Style Popup.

Commits Overview
c0f3db8 - Added new files
afcddfb - Added subclass
683b631 - Added constructor TextStylePopupModel(QObject* parent)
f75e5fd - Added updatePosition function in TextStylePopup
133cad9 - Implemented TextStylePopup's Interface
Added TextStylePopupModel to the notation module.
Completed the basic interface for TextStylePopup.
0f53c28 - Update TextStylePopup.qml
f006f36 - Added inserting symbols through the popup
Added inserting symbols through the popup.
Fixed the width of the `Add symbols`, `Text style` and `Frame` Button.
Added a new QML for the text style popup.
e445252 - Updated the updatePosition function in response to PR #18738.
Updated the popup's position function to work as intended.
5f83b3a - Moved Popup System to Inspector module
Shifted popup system to Inspector Module, added an interface for improved modularity and organization.
4e34238 - Added TextSettingsModel as Member of TextStylePopupModel
2ac9bd3 - Added Functionality to the popup
Added functionality to the popup
Moved `ElementPopupLoader` back to the root folder of `Inspector` module
Removed unnecessary lines of code
2ac9bd3 - Added keyboard navigation to the main Popup
Added keyboard navigation to the main popup.
Fixes
556e763 - Added Keyboard Navigation to Popups
This commit adds keyboard navigation support to the `FrameSubPopup.qml` and `TextStyleSubPopup.qml`, improving
user accessibility and interaction.This commit adds keyboard navigation support to the `FrameSubPopup.qml` and `TextStyleSubPopup.qml`,
improving user accessibility and interaction.
Project Progress
Throughout the summer, I took on the ambitious task of implementing the Text Style Popup feature. Today, I'm thrilled to present the result of my hard work! This project turned out to be more intricate than we initially expected, necessitating an extension that turned it into an 18-week project.

Here is the final product.

Text Style Popup

Main popup

Text Style Subopup

Text Style Subpopup

Frame Subpop

Frame Subpop

Evaluation
The project faced challenges in fulfilling all aspects outlined in the proposal due to the realization that the main project was considerably more complex than initially anticipated. Despite this, the project successfully completed the primary objective, which was the development of the main text style popup.

Future Work
The ongoing work will prioritize addressing an intermittent issue where the main popup fails to launch consistently. Additionally, there are other essential tasks to be undertaken:
1. Synchronizing secondary popups with the main popup's movement to enhance user experience.
2. Ensuring that clicks on the dropshadow area of the popup register with elements behind it, improving overall interactivity and usability.

Connect with Me
If you'd like to connect with me or explore more
of my work, you can find me on:

GitHub: GitHub Profile
LinkedIn: LinkedIn Profile


As I wrap up this project, I want to express my genuine appreciation for the opportunity to work on it for MuseScore. I am immensely thankful to my mentor, Casper, for their unwavering support throughout this endeavor, as well as to all those who contributed to the project's success.

https://musescore.org/en/user/4385394/blog/2023/10/08/gsoc-2023-text-style-popup