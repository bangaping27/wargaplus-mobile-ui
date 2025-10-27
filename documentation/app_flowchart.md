flowchart TD
    A[App Launch] --> B{Auth Token exists}
    B -->|Yes| C[Go to Dashboard Screen]
    B -->|No| D[Go to Login Screen]
    D --> E[User enters credentials]
    E --> F[Call API auth sign in]
    F --> G[Receive auth token]
    G --> C
    C --> H[User taps Payments Tab]
    H --> I[Call API payments]
    I --> J[Display Payment Screen]
    C --> K[User taps Feed Tab]
    K --> L[Call API feed]
    L --> M[Display Feed Screen]
    C --> N[User taps Profile Tab]
    N --> O[Call API profile]
    O --> P[Display Profile Screen]
    P --> Q[User taps Logout]
    Q --> R[Clear auth token]
    R --> D