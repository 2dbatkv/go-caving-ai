# gocaving.ai - PlantUML Architecture Diagrams

This directory contains comprehensive PlantUML diagrams documenting the architecture of gocaving.ai across different phases and potential future implementations.

## Diagram Overview

### Current State (Phase 1)

**01-current-architecture.puml**
- High-level view of current static site architecture
- Shows GitHub → Netlify deployment pipeline
- Netlify Forms integration
- DNS configuration with GoDaddy

**02-component-diagram.puml**
- Detailed component breakdown
- Frontend sections (Hero, Discussions, Projects, etc.)
- Styling components (Tailwind, custom CSS)
- Asset management (cave images)
- Netlify services integration

**03-form-submission-sequence.puml**
- Sequence diagram showing form submission flow
- User interaction → Validation → Netlify processing
- Spam detection workflow
- Admin notification flow

**04-data-flow.puml**
- Data flow through the current system
- User interactions
- Form processing decisions
- Spam filtering logic

**08-deployment-diagram.puml**
- Physical deployment architecture
- Developer workflow
- GitHub → Netlify pipeline
- Global CDN distribution
- DNS resolution

### Future State (Phase 2 & Beyond)

**05-phase2-backend-architecture.puml**
- Backend integration with Render
- PostgreSQL database
- RESTful API design
- Email service integration
- Dynamic content management

**06-future-ai-architecture.puml**
- Advanced AI-integrated system
- MCP (Model Context Protocol) server
- Specialized AI agents
- Multi-LLM support (Claude, OpenAI, local)
- Vector database for semantic search
- Tool ecosystem

**07-ai-agent-workflow.puml**
- Detailed sequence of AI agent interaction
- Survey analysis workflow
- MCP tool usage
- Vector search for context
- Claude API integration

## Viewing the Diagrams

### Online Viewers

1. **PlantUML Web Server**
   - Visit: http://www.plantuml.com/plantuml/uml/
   - Copy/paste diagram code
   - View rendered diagram

2. **PlantText**
   - Visit: https://www.planttext.com/
   - Paste code and click "Refresh"

### VS Code

Install the PlantUML extension:
```bash
code --install-extension jebbs.plantuml
```

Then:
- Open any .puml file
- Press `Alt+D` to preview
- Or right-click → "Preview Current Diagram"

### Command Line

Install PlantUML:
```bash
# Ubuntu/Debian
sudo apt-get install plantuml

# Or use Java JAR
wget https://sourceforge.net/projects/plantuml/files/plantuml.jar
```

Generate PNG/SVG:
```bash
# Generate all diagrams as PNG
plantuml diagrams/*.puml

# Generate as SVG
plantuml -tsvg diagrams/*.puml

# Generate to specific directory
plantuml -o ../output diagrams/*.puml
```

## Diagram Descriptions

### 01 - Current Architecture
**Purpose:** Understand the existing deployment
**Audience:** Developers, DevOps
**Key Concepts:**
- Static site hosting
- Netlify Forms
- Auto-deployment from GitHub
- CDN distribution

### 02 - Component Diagram
**Purpose:** Understand frontend structure
**Audience:** Frontend developers
**Key Concepts:**
- Section components
- Styling architecture
- Asset management
- Form handling

### 03 - Form Submission Sequence
**Purpose:** Debug form issues, understand flow
**Audience:** Developers troubleshooting forms
**Key Concepts:**
- Client-side validation
- Netlify Forms processing
- Spam detection
- Admin notifications

### 04 - Data Flow
**Purpose:** Understand decision points
**Audience:** Product managers, developers
**Key Concepts:**
- User journeys
- Spam filtering
- Data storage decisions

### 05 - Phase 2 Backend
**Purpose:** Plan backend migration
**Audience:** Full-stack developers, architects
**Key Concepts:**
- API design
- Database schema
- Service integration
- Email automation

### 06 - Future AI Architecture
**Purpose:** Vision for AI integration
**Audience:** AI engineers, architects
**Key Concepts:**
- MCP protocol
- Agent orchestration
- Multi-LLM strategy
- Tool ecosystem
- Vector search

### 07 - AI Agent Workflow
**Purpose:** Understand AI agent behavior
**Audience:** AI developers, data scientists
**Key Concepts:**
- Agent-MCP interaction
- Tool invocation
- Context management
- LLM integration
- Result synthesis

### 08 - Deployment Diagram
**Purpose:** Understand infrastructure
**Audience:** DevOps, infrastructure engineers
**Key Concepts:**
- Deployment pipeline
- CDN distribution
- DNS configuration
- Build process

## Key Technologies

### Current (Phase 1)
- **Frontend:** HTML, Tailwind CSS, Vanilla JS
- **Hosting:** Netlify
- **Forms:** Netlify Forms
- **DNS:** GoDaddy
- **Version Control:** GitHub
- **Images:** Cave photography assets

### Phase 2
- **Backend:** FastAPI or Flask (Python)
- **Database:** PostgreSQL (Render)
- **API:** RESTful, possibly GraphQL
- **Email:** SendGrid or Mailgun
- **Auth:** JWT tokens

### Future AI Integration
- **MCP:** Model Context Protocol server
- **LLMs:** Claude (Anthropic), OpenAI, Ollama
- **Vector DB:** Pinecone or Weaviate
- **Agents:** Survey analysis, data cleaning, mapping
- **Tools:** Survey parsers, QGIS integration, validation

## Development Roadmap

### ✅ Phase 1 (Current - Complete)
- Static landing page
- Netlify Forms
- Email signup
- Event information
- Projects showcase

### 🔄 Phase 2 (Planned)
- Backend API
- PostgreSQL database
- Dynamic content
- Email confirmations
- User management

### 🚀 Phase 3 (Future)
- AI agent integration
- MCP tool ecosystem
- Survey analysis tools
- Vector search
- Multi-modal AI capabilities

## Using These Diagrams

### For Documentation
- Include in README
- Share with team
- Present to stakeholders
- Onboard new developers

### For Planning
- Estimate effort for Phase 2
- Identify dependencies
- Plan API contracts
- Design database schema

### For Development
- Reference during implementation
- Validate architecture decisions
- Debug issues
- Plan testing

## Updating Diagrams

When making changes to the architecture:

1. **Update the relevant .puml file**
2. **Regenerate images** (if storing PNG/SVG)
3. **Update this README** if adding new diagrams
4. **Commit to version control**

## Related Documentation

- `../README.md` - Main project README
- `../DEPLOY.md` - Deployment guide
- `../ADMIN-GUIDE.md` - Form management
- `../ZAPIER-SETUP.md` - Zapier integration
- `../DESIGN.md` - Original design docs (in parent directory)

## Questions or Improvements?

These diagrams are living documentation. If you:
- Find errors or inconsistencies
- Have suggestions for new diagrams
- Want more detail on specific areas
- Need different diagram types (class, state, etc.)

Feel free to update the .puml files and submit a PR!

## License

These diagrams are part of the gocaving.ai project documentation.
© 2025 gocaving.ai
