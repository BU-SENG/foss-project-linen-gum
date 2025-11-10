# Aidly - Database Schema Documentation

## Admin Collection/Table
| Field | Type | Required | Unique | Default | Description |
|-------|------|---------|--------|--------|------|
| fullName | String | Yes | No | - | Admin's full name |
| email | String | Yes | Yes | - | Stored in lowercase |
| password | String | Yes | No | - | Hashed password |
| isVerified | Boolean | No | No | false | Email verification status |
| resetPasswordToken | String | No | No | - | Token for password reset |
| resetPasswordExpiresAt | Date | No | No | - | Expiry of password reset token |
| verificationToken | String | No | No | - | Email verification token |
| verificationTokenExpiresAt | Date | No | No | - | Expiry of verification token |
| passwordChangedAt | Date | No | No | - | Timestamp of last password change |
| createdAt | Date | No | No | auto | Timestamp of creation |
| updatedAt | Date | No | No | auto | Timestamp of last update |

---

## Creator Collection/Table
| Field | Type | Required | Unique | Default | Description |
|-------|------|---------|--------|--------|------|
| fullName | String | Yes | No | - | Creator's full name |
| email | String | Yes | Yes | - | Stored in lowercase |
| password | String | Yes | No | - | Hashed password |
| isVerified | Boolean | No | No | false | Email verification status |
| resetPasswordToken | String | No | No | - | Token for password reset |
| resetPasswordExpiresAt | Date | No | No | - | Expiry of password reset token |
| verificationToken | String | No | No | - | Email verification token |
| verificationTokenExpiresAt | Date | No | No | - | Expiry of verification token |
| passwordChangedAt | Date | No | No | - | Timestamp of last password change |
| createdAt | Date | No | No | auto | Timestamp of creation |
| updatedAt | Date | No | No | auto | Timestamp of last update |

---

## Campaign Collection/Table
| Field | Type | Required | Unique | Default | Description |
|-------|------|---------|--------|--------|------|
| title | String | Yes | No | - | Campaign title |
| description | String | Yes | No | - | Campaign description |
| category | String | Yes | No | - | One of: Education, Health, Technology, Environment, Community, Business, Charity, Art, Other |
| location | String | Yes | No | - | Campaign location |
| images | Array of Strings | No | No | - | URLs or file paths of images |
| fundingGoal | Number | Yes | No | - | Amount to be raised |
| amountRaised | Number | No | No | 0 | Amount already raised |
| numberOfDonors | Number | No | No | 0 | Number of donors |
| duration | Number | Yes | No | - | Duration in days |
| dateCreated | Date | No | No | Date.now | Campaign creation date |
| isApproved | Boolean | No | No | false | Approval status |
| createdBy | ObjectId | Yes | No | - | References Creator collection |
| createdAt | Date | No | No | auto | Timestamp of creation |
| updatedAt | Date | No | No | auto | Timestamp of last update |

---

## Donation Collection/Table
| Field | Type | Required | Unique | Default | Description |
|-------|------|---------|--------|--------|------|
| donorName | String | No | No | - | Name of the donor |
| donorEmail | String | Yes | No | - | Donor's email |
| amount | Number | Yes | No | - | Donation amount |
| campaign | ObjectId | Yes | No | - | References Campaign collection |
| transactionId | String | No | No | - | Payment transaction ID |
| txRef | String | No | Yes | - | Unique payment reference |
| paymentStatus | String | No | No | pending | One of: pending, successful, failed, cancelled |
| createdAt | Date | No | No | auto | Timestamp of creation |
| updatedAt | Date | No | No | auto | Timestamp of last update |