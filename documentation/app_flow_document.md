# App Flow Document for Warga+ Mobile App

## Onboarding and Sign-In/Sign-Up

When a brand-new user installs the Warga+ mobile app from the App Store or Google Play, they are greeted with a welcome screen that briefly highlights the app’s benefits and asks them to either sign in or sign up. Selecting “Create Account” leads the user to a registration page where they provide their email, choose a secure password, and confirm their house or unit number. After tapping “Register,” the app calls the backend API to create the new account. Upon successful registration, a verification email is sent to the user’s inbox. The user taps the link in the email, which opens the app and automatically verifies the account. If the link does not work, the user can copy it and paste it into a browser, then return to the app to sign in.

Users who already have an account tap “Sign In” on the welcome screen. They enter their email and password, and then tap “Log In.” The app sends these credentials to the backend `/api/auth/sign-in` endpoint. If the credentials are valid, the backend returns a JWT access token that the app securely stores. If credentials are invalid, the user sees an inline error message saying the email or password is incorrect.

If a user forgets their password, they tap “Forgot Password” on the sign-in screen. The app navigates them to a recovery page where they enter their registered email. Tapping “Send Reset Link” calls the backend `/api/auth/forgot-password` endpoint, which emails a password reset link. The user opens the link, enters a new password in the browser, and on success they return to the app’s sign-in screen to log in with the new credentials.

Signing out is available under the Profile screen. Tapping “Log Out” clears the stored token and returns the user to the welcome screen.

## Main Dashboard or Home Page

Once signed in, the user lands on the Dashboard tab. The Dashboard features a top header with the user’s name and a notification bell icon that indicates unread announcements. Below the header sits a StatusCard that summarizes the user’s current payment standing, such as whether the latest community dues are paid. Underneath is an AnnouncementSection that lists the three most recent community updates. Further down, a ScheduleList displays upcoming events or maintenance schedules.

At the bottom of the screen is a persistent navigation bar with four tabs: Dashboard, Feed, Payments, and Profile. Each tab is represented by an icon and label. Tapping any icon switches the view to the corresponding screen.

## Detailed Feature Flows and Page Transitions

When the user taps on an announcement in the AnnouncementSection, the app navigates to AnnouncementDetail. This page shows the full content of the update, including any images and links. The user can scroll through the text and tap a back arrow in the header to return to the Dashboard.

Switching to the Feed tab takes the user to an infinite-scroll list of InfoCards. On entering the Feed screen, the app fetches the first page of data from the `/api/feed` endpoint using the stored token. As the user scrolls down, additional pages load automatically. Tapping any InfoCard opens a FeedDetail screen that displays the complete post, comments, and any attachments. A back arrow returns the user to the Feed.

On the Payments tab, the user sees a list of their past payments, each represented as an IuranCard showing date, amount, and status. Pulling down refreshes the list. At the bottom right, a floating “New Payment” button invites users to settle upcoming dues. Tapping it opens NewPaymentModal or a separate NewPayment screen. Here, the user selects a payment type, enters an amount if applicable, and can optionally scan a QR code. Tapping “Pay Now” sends a request to `/api/payments`. While processing, the app shows a loading spinner. On success, a confirmation message appears briefly and the user is returned to the Payments screen with the new payment appended to the top of the list. Any payment failures display an error banner with a retry option.

Selecting the Profile tab brings up the ProfileScreen, which displays the user’s name, email, house details, and profile photo. Below this information are buttons for editing personal details and changing the password. Tapping “Edit Profile” navigates to EditProfileScreen. The user can update fields such as address, phone number, or photo. Tapping “Save” calls `/api/profile/update`, and on success the app returns to ProfileScreen showing the updated information.

Under the ProfileScreen, a “Settings” option leads to SettingsScreen. Here, the user manages notification preferences, toggles push notifications on or off, and can view app version information. A “Change Password” button navigates to ChangePasswordScreen where the user enters current and new passwords; success returns them to Settings with a confirmation toast. At any point, tapping “Log Out” clears the token and sends the user back to the welcome screen.

## Settings and Account Management

The SettingsScreen gives users control over their account preferences. The page loads the current notification settings by calling `/api/profile/settings`. Users can toggle email and push notifications and then tap “Save Preferences,” which updates the server via the same endpoint. The page also displays a section for subscription or billing information if the community requires premium services. Tapping “Manage Subscription” opens SubscriptionScreen, where the user sees their plan details, next billing date, and can upgrade or cancel via calls to `/api/billing` endpoints. After making changes the user taps “Done” to return to Settings.

From Settings or Profile, the user can always navigate back to the main tab bar by tapping the Dashboard, Feed, Payments, or Profile icons at the bottom.

## Error States and Alternate Paths

If the app ever fails to connect to the server—due to lost network or server downtime—a full-screen offline banner appears at the top of every screen. The user can tap “Retry” to reattempt the last request. While offline, any actions that require communication with the backend display a local error message stating “Cannot connect. Please check your internet.”

When the user submits invalid form data, such as an incorrect email format or mismatched passwords, the relevant input field shows an inline error message explaining the issue. For protected routes, if the JWT token has expired or is invalid, the backend returns a 401 error. The app intercepts this response, clears stored tokens, and automatically navigates the user back to the sign-in screen with a message saying “Session expired, please log in again.”

For restricted actions such as accessing billing management without a subscription, the user sees a modal explaining the restriction and an option to contact support. Tapping “Contact Support” opens the device’s email client pre-filled with the support address and a template subject.

## Conclusion and Overall App Journey

A typical Warga+ user journey starts with downloading the app and creating an account with their email and house number. After verifying their email, they sign in and land on the Dashboard, which highlights their payment status, recent announcements, and upcoming schedules. From there, they use the bottom navigation to explore community news in the Feed, manage their dues in Payments, and update personal details in Profile and Settings. Throughout their experience, the app handles errors gracefully, supports password recovery, and maintains secure access via token-based authentication. This seamless flow ensures that residents can efficiently stay informed, pay community dues, and manage their profile all within the Warga+ mobile app.