# Wave AC Services

## Current State
App has 5 pages: Home, Services, Why Us, Testimonials, Contact. The Why Us page has a text-based About section with a blue circle icon placeholder instead of a real team photo.

## Requested Changes (Diff)

### Add
- Team photo section on Why Us page: Owner (Mohammad Dilshad) photo with name/title card
- Group team photo showing the full Wave AC team

### Modify
- WhyUsPage About section: Replace the blue circle Wind icon placeholder with actual team photos -- owner portrait and team group photo

### Remove
- The generic Wind icon circle placeholder in the About section

## Implementation Plan
1. Add team owner photo (`/assets/generated/team-owner.dim_400x400.jpg`) in the About section replacing the circle placeholder
2. Add team group photo (`/assets/generated/team-group.dim_800x500.jpg`) as a new "Our Team" section below the About section
3. Add name/title label under owner photo: "Mohammad Dilshad" and "Founder & Owner"
