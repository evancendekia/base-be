# Healthfulforu.com v2.0
## Full Stack System Design Document

---

# 1. High-Level System Architecture

Healthfulforu 2.0 is a subscription-based public health education platform designed to deliver daily articles, videos, and interactive tools across the Asia-Pacific region. The architecture prioritizes scalability, clean separation of concerns, and efficient development for a small engineering team.

The system follows a **modular monolith backend architecture**, with a decoupled CMS and object storage for media.

---

## 1.1 Frontend

**Technology:** React (Web), React Native (Future Mobile)  
**Hosting:** CDN-backed static hosting using Vercel

### Responsibilities:
- Render articles and videos
- Manage authentication UI
- Handle subscription management
- Display personalized content

### CDN Strategy:
The frontend is deployed to a CDN-backed hosting platform. Static assets like images or videos are distributed across global edge locations.

**Benefits:**
- Reduced latency across Asia-Pacific
- Improved performance for high read traffic
- Reduced backend load
- Better availability and resilience

The CDN serves static assets directly from edge nodes, ensuring scalability without increasing backend complexity.

---

## 1.2 Backend

**Technology:** Node.js + Express  
**Architecture:** Modular Monolith  
**Hosting:** Cloud platform Railway

### Responsibilities:
- JWT authentication
- Subscription validation
- Premium content access control
- CMS content aggregation
- Notification triggering
- User preference management

### Why Modular Monolith?
A modular monolith is chosen to balance development speed, maintainability, and operational simplicity, particularly for a small engineering team in an early-stage product.

- Clear Domain Separation

Internal modules (auth, content, subscription, notification) are logically separated with well-defined boundaries. This enforces clean architecture principles while avoiding the complexity of multiple services.

- Lower Operational Complexity

Maintaining a single, well-structured backend application significantly reduces operational overhead and long-term maintenance effort.

- Faster Iteration for MVP

Early-stage products require rapid experimentation and iteration. A modular monolith allows quick changes without coordinating multiple services or managing cross-service version compatibility.

- Cost Efficiency

Running multiple independent services increases infrastructure cost (compute, networking, monitoring). A single backend service keeps infrastructure lean during the MVP stage.

- Future Extraction Path

Because domain boundaries are already enforced internally, specific modules (e.g., notification or auth) can be extracted into independent services later if traffic scale or team growth justifies it.

---

## 1.3 CMS

**Technology:** Strapi
**Database:** Separate PostgreSQL database (`cms_db`)

### Responsibilities:
- Article management
- Video metadata management
- Topic tagging

### Rationale:
The CMS is decoupled from the backend. Content is accessed via REST API rather than direct database access. This ensures service isolation and prevents schema conflicts.

---

## 1.4 Database

**Technology:** PostgreSQL

Two logical databases:

- `backend_db` – Users, subscriptions, preferences
- `cms_db` – Articles, topics, media metadata

### Why PostgreSQL?

- Strong relational modeling
- JSON support for flexible fields
- Mature ecosystem and scalability
- Advanced Full-Text Search Capabilities

Logical separation prevents cross-service migration conflicts while minimizing infrastructure cost.

---

## 1.5 Media Storage

**Technology:** Cloudflare R2

### Responsibilities:
- Store images
- Store video files
- Deliver media via CDN

### Rationale:
Large media files are not stored in the database. Object storage ensures:
- Scalable storage
- Cost efficiency
- High availability
- Global delivery via CDN

---

## 1.6 Notifications

**Technology:** Transactional email provider (Postmark)

### Responsibilities:
- Welcome email notification
- Forget password feature
- Account verification
- Subscription confirmation
- Renewal reminders
- Content alerts


---

# 2. Technology Choices

---

## 2.1 Why Node vs Laravel vs Go?

### Decision: Node.js

Node.js is selected as the backend technology due to its alignment with team efficiency, cost-effectiveness, and long-term scalability strategy.

For an early-stage platform built by a small engineering team, development speed and operational simplicity are critical. Using JavaScript across the stack (React frontend and Node.js backend) ensures ecosystem consistency, reduces context switching, and simplifies onboarding for new developers.

This decision also directly supports future mobile expansion. As the platform evolves to include mobile applications built with React Native, the same engineering team can leverage their existing JavaScript expertise across:

- Web frontend (React)
- Mobile apps (React Native)
- Backend services (Node.js)

Maintaining a unified language across web, mobile, and backend reduces team fragmentation, accelerates cross-platform development, and lowers hiring and training overhead.

---

### Technical Suitability

Node.js is well-suited for IO-heavy applications such as content delivery platforms, where most operations involve:

- Database reads
- API integrations
- Media handling
- Authentication and access control

Rather than CPU-intensive processing, the platform primarily performs asynchronous operations — an area where Node.js performs efficiently.

---

### Team & Cost Considerations

From a practical leadership perspective:

- A unified JavaScript stack reduces hiring friction.
- The same team can support web, mobile, and backend.
- Shared tooling and patterns improve development velocity.
- Faster iteration cycles support MVP delivery.
- Operational cost remains manageable during early growth.

For a small team, minimizing cognitive load and deployment complexity is more valuable than prematurely optimizing for distributed performance.

---


---

## 2.2 Monolith vs Modular Monolith vs Microservices

### Decision: Modular Monolith

The backend follows a **modular monolith architecture**. This approach provides the right balance between structure, maintainability, and operational simplicity for an early-stage product built by a small engineering team.

---

### Why Modular Monolith Instead of Traditional Monolith?

While both approaches deploy as a single application, the key difference lies in internal structure.

A traditional monolith often evolves into tightly coupled code where business logic, data access, and domain responsibilities become interdependent. Over time, this creates:

- Difficult-to-maintain codebases
- Increased risk when making changes
- Limited clarity in domain ownership
- Slower development as complexity grows

This ensures the system remains maintainable as features grow, without introducing distributed system complexity.

For a small team, this structure improves:

- Code readability
- Developer onboarding
- Testing clarity
- Long-term maintainability

---

### Why Not Microservices?

Microservices are powerful but introduce additional operational complexity, such as managing communication between services, coordinating deployments, monitoring distributed systems, and handling higher infrastructure costs.

These trade-offs are typically justified when:
- The system handles very high traffic
- Multiple engineering teams operate independently
- Different services need to scale separately

For an early-stage MVP with a small team, this level of complexity is unnecessary and would slow development without delivering proportional benefits.

Prematurely adopting microservices can:

- Slow development velocity
- Increase debugging difficulty
- Raise infrastructure and monitoring costs
- Complicate deployment pipelines

---

# 3. Data Models

---

## User
- id
- email
- password_hash
- name
- created_at

---

## Subscription
- id
- user_id (FK → User)
- plan_type
- status
- start_date
- end_date

Relationship:  
User (1) → (1) Subscription

---

## Content (Article / Video)
- id
- title
- body
- media
- is_premium (boolean)
- published_at

---

## Topic
- id
- name
- banner

Relationship:  
Content (M) ↔ (N) Topic

---

## User Preferences
- id
- user_id (FK)
- topic_id (FK)

Relationship:  
User (M) ↔ (N) Topic

---

# 4. Scalability Strategy

---

## MVP Stage (0–10k Users)

Architecture:
- Single backend instance
- Single PostgreSQL instance
- CDN for frontend
- Object storage for media
- Direct email integration using Postmark

Why:
- Low operational complexity
- Cost-efficient
- Sufficient for early traffic

---

## Growth Stage (100k–1M+ Users)

Enhancements:
- Multiple backend instances behind load balancer
- Database vertical scaling and read replicas
- Redis caching for popular content
- Background job queue for email processing

Principle:
Scale incrementally based on actual bottlenecks.

---

## Long-Term Evolution

- Extract notification module into independent service
- Introduce event-driven processing
- Partition large database tables
- Regional backend deployments

Microservices are introduced only when justified by scale and team growth.

---

# 5. Security Considerations

---

## Authentication
- JWT-based stateless authentication
- Password hashing using bcrypt
- Token expiration

---

## Access Control
- Subcription flag based authorization
- Backend-enforced premium gating
- CMS access restricted to admins

---

## Data Privacy
- HTTPS enforced in production
- Environment variables for secrets
- Logical database separation

Future Enhancements:
- Rate limiting
- API throttling
- Audit logging

---

# Conclusion

The proposed architecture emphasizes:

- Clean separation of concerns
- CDN-optimized frontend delivery
- Modular backend structure
- Scalable data modeling
- Incremental scalability strategy
- Strong security foundation

This approach enables rapid MVP delivery while preserving a clear path toward horizontal scalability and future service extraction.




# Trade-offs

All architectural decisions involve balancing simplicity, cost, scalability, and development speed. The following trade-offs were made intentionally to support a small engineering team building an early-stage product.

---

## 1. Modular Monolith

**Decision:** Use a modular monolith architecture.

**Benefit:**
- Easier to maintain and understand
- Single deployment pipeline
- Faster development for a small team
- Lower operational overhead

**Trade-off:**
- Modules cannot scale independently at the infrastructure level.

**Reasoning:**
For an MVP, operational simplicity and maintainability are prioritized over distributed scalability. Clear internal boundaries allow future service extraction if growth justifies it.

---

## 2. Direct Email Integration

**Decision:** Send transactional emails directly from the backend without a job queue.

**Benefit:**
- Simple implementation
- Fewer infrastructure components
- Lower cost and faster development

**Trade-off:**
- Email processing is handled within the request flow.
- Less resilient for very high email volumes.

**Reasoning:**
At early scale, email volume is manageable. A background job queue can be introduced later if system load increases.

---

## 3. CDN-Backed Static Frontend

**Decision:** Deploy frontend as static assets via CDN.

**Benefit:**
- Fast global delivery
- Reduced backend load
- Easy horizontal scalability
- Lower infrastructure cost

**Trade-off:**
- Dynamic and personalized content must be fetched through backend APIs rather than rendered server-side.

**Reasoning:**
The platform is primarily read-heavy, with most content publicly accessible. Static delivery maximizes performance and scalability while keeping infrastructure simple. If SEO competition or personalization requirements grow significantly, hybrid rendering strategies (e.g., SSR or incremental static regeneration) can be introduced later.

---

## 4. Separate CMS Service

**Decision:** Use a standalone headless CMS.

**Benefit:**
- Clear separation between content management and business logic
- Allows non-developers to manage content
- Reduces backend code changes for editorial updates

**Trade-off:**
- Adds another service to manage and monitor.
- Backend depends on CMS API availability.

**Reasoning:**
Separation improves long-term maintainability and allows the engineering team to focus on application logic while content teams operate independently.

---

# Summary

The architecture intentionally prioritizes:

- Simplicity
- Maintainability
- Cost efficiency
- Fast iteration for MVP

More complex distributed solutions are deferred until traffic scale, feature complexity, or team growth justify the additional operational overhead.


# Judgment & Decision-Making

## 1. What Would You Build in the First 30 Days?

The focus would be on delivering a functional and stable MVP with core value:

- User authentication (register/login)
- Subscription gating (free vs premium content)
- Content delivery via CMS integration
- Basic article search and listing
- Transactional email (account verification, subscription confirmation)
- Production-ready deployment pipeline

The goal is to validate product-market fit and ensure a stable foundation before expanding features.

---

## 2. What Would You Not Build Yet — and Why?

The following would be intentionally deferred:

- Microservices architecture
- Advanced recommendation engine
- Real-time push notification system
- Complex analytics dashboards
- Dedicated search infrastructure (e.g., Elasticsearch)

These features increase operational complexity and cost. For early-stage validation, simplicity and speed are more important than advanced scalability.

---

## 3. Top 3 Technical Risks

1. Database Performance Bottlenecks  
   High read traffic may strain the database without proper indexing and caching.

2. Content Delivery Latency  
   Regional users in Asia-Pacific require optimized CDN and caching strategy.

3. Subscription & Access Control Integrity  
   Incorrect gating logic could allow unauthorized premium access.

Mitigation involves indexing strategy, CDN optimization, and strict backend-level authorization enforcement.

---

## 4. How Would You Onboard a Junior Developer?

- Provide clear project structure documentation.
- Explain domain modules (auth, content, subscription, notification).
- Start them with well-defined, isolated tasks.
- Use code reviews as learning opportunities.
- Encourage writing tests alongside features.

The modular architecture ensures junior developers can work within one domain without understanding the entire system at once.

---

## 5. How Would You Ensure Quality While Moving Fast?

- Keep architecture simple and modular.
- Enforce code review for every PR.
- Write tests for critical flows (auth, subscription gating).
- Use staging environment before production release.
- Monitor logs and errors after deployment.

The priority is disciplined simplicity rather than over-engineering.