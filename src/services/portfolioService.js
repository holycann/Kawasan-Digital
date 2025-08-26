import { supabase } from '../configs/supabase'

class PortfolioService {
  constructor() {
    this.supabase = supabase
  }

  async getAllPortfolio() {
    try {
      console.log('🔍 Fetching all portfolio from projects table...')
      
      const { data, error } = await this.supabase
        .from('projects')
        .select(`
          *,
          category:project_categories(name),
          client:clients(name),
          tech_stack:project_tech_stack(
            tech_stack:tech_stack(tech_name, tech_category)
          ),
          images:project_images(image_url, image_title, image_order),
          stories:project_stories(story_section, story_content, story_order),
          highlights:project_highlights(highlight_text, highlight_type, highlight_impact)
        `)
        .eq('project_status', 'published')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase error:', error)
        throw new Error(error.message || 'Failed to fetch portfolio')
      }

      // Transform data to match expected format
      const transformedData = data.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        short_description: item.short_description,
        description: item.description,
        cover_image: item.cover_image,
        gallery_images: item.images?.map(img => img.image_url).sort((a, b) => 
          (item.images.find(img => img.image_url === a)?.image_order || 0) - 
          (item.images.find(img => img.image_url === b)?.image_order || 0)
        ) || [],
        category: item.category?.name || 'Unknown',
        client_name: item.client?.name || item.client_name,
        year: item.year,
        technologies: item.tech_stack?.map(tech => tech.tech_stack?.tech_name).filter(Boolean) || [],
        project_url: item.website_url,
        github_url: item.github_url,
        demo_url: item.demo_url,
        featured: item.featured || false,
        status: item.project_status || 'published',
        created_at: item.created_at,
        updated_at: item.updated_at,
        // Additional fields from the database
        project_location: item.project_location,
        stories: item.stories?.sort((a, b) => a.story_order - b.story_order) || [],
        highlights: item.highlights || []
      }))

      console.log('✅ Portfolio data fetched:', transformedData)
      return transformedData || []
      
    } catch (error) {
      console.error('❌ PortfolioService.getAllPortfolio error:', error)
      throw error
    }
  }

  async getAllPortfolioAdmin() {
    try {
      console.log('🔍 Fetching all portfolio for admin...')
      
      const { data, error } = await this.supabase
        .from('projects')
        .select(`
          *,
          category:project_categories(name),
          client:clients(name),
          tech_stack:project_tech_stack(
            tech_stack:tech_stack(tech_name, tech_category)
          ),
          images:project_images(image_url, image_title, image_order),
          stories:project_stories(story_section, story_content, story_order),
          highlights:project_highlights(highlight_text, highlight_type, highlight_impact)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase error:', error)
        throw new Error(error.message || 'Failed to fetch portfolio')
      }

      // Transform data to match expected format
      const transformedData = data.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        short_description: item.short_description,
        description: item.description,
        cover_image: item.cover_image,
        gallery_images: item.images?.map(img => img.image_url).sort((a, b) => 
          (item.images.find(img => img.image_url === a)?.image_order || 0) - 
          (item.images.find(img => img.image_url === b)?.image_order || 0)
        ) || [],
        category: item.category?.name || 'Unknown',
        client_name: item.client?.name || item.client_name,
        year: item.year,
        technologies: item.tech_stack?.map(tech => tech.tech_stack?.tech_name).filter(Boolean) || [],
        project_url: item.website_url,
        github_url: item.github_url,
        demo_url: item.demo_url,
        featured: item.featured || false,
        status: item.project_status || 'published',
        created_at: item.created_at,
        updated_at: item.updated_at,
        // Additional fields from the database
        project_location: item.project_location,
        stories: item.stories?.sort((a, b) => a.story_order - b.story_order) || [],
        highlights: item.highlights || []
      }))

      console.log('✅ Admin portfolio data fetched:', transformedData)
      return transformedData || []
      
    } catch (error) {
      console.error('❌ PortfolioService.getAllPortfolioAdmin error:', error)
      throw error
    }
  }

  async getPortfolioBySlug(slug) {
    try {
      console.log(' Fetching portfolio by slug:', slug)
      
      const { data, error } = await this.supabase
        .from('projects')
        .select(`
          *,
          category:project_categories(name),
          client:clients(name),
          tech_stack:project_tech_stack(
            tech_stack:tech_stack(tech_name, tech_category)
          ),
          images:project_images(image_url, image_title, image_order),
          stories:project_stories(story_section, story_content, story_order),
          highlights:project_highlights(highlight_text, highlight_type, highlight_impact)
        `)
        .eq('project_status', 'published')
        .single()

      if (error) {
        console.error('❌ Supabase error:', error)
        throw new Error(error.message || 'Portfolio not found')
      }

      // Transform data to match expected format
      const transformedData = {
        id: data.id,
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        short_description: data.short_description,
        description: data.description,
        cover_image: data.cover_image,
        gallery_images: data.images?.map(img => img.image_url).sort((a, b) => 
          (data.images.find(img => img.image_url === a)?.image_order || 0) - 
          (data.images.find(img => img.image_url === b)?.image_order || 0)
        ) || [],
        category: data.category?.name || 'Unknown',
        client_name: data.client?.name || data.client_name,
        year: data.year,
        technologies: data.tech_stack?.map(tech => tech.tech_stack?.tech_name).filter(Boolean) || [],
        project_url: data.website_url,
        github_url: data.github_url,
        demo_url: data.demo_url,
        featured: data.featured || false,
        status: data.project_status || 'published',
        created_at: data.created_at,
        updated_at: data.updated_at,
        // Additional fields from the database
        project_location: data.project_location,
        stories: data.stories?.sort((a, b) => a.story_order - b.story_order) || [],
        highlights: data.highlights || []
      }

      console.log('✅ Portfolio by slug fetched:', transformedData)
      return transformedData
      
    } catch (error) {
      console.error('❌ PortfolioService.getPortfolioBySlug error:', error)
      throw error
    }
  }

  async getPortfolioById(id) {
    try {
      console.log(' Fetching portfolio by ID:', id)
      
      const { data, error } = await this.supabase
        .from('projects')
        .select(`
          *,
          category:project_categories(name),
          client:clients(name),
          tech_stack:project_tech_stack(
            tech_stack:tech_stack(tech_name, tech_category)
          ),
          images:project_images(image_url, image_title, image_order),
          stories:project_stories(story_section, story_content, story_order),
          highlights:project_highlights(highlight_text, highlight_type, highlight_impact)
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('❌ Supabase error:', error)
        throw new Error(error.message || 'Portfolio not found')
      }

      // Transform data to match expected format
      const transformedData = {
        id: data.id,
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        short_description: data.short_description,
        description: data.description,
        cover_image: data.cover_image,
        gallery_images: data.images?.map(img => img.image_url).sort((a, b) => 
          (data.images.find(img => img.image_url === a)?.image_order || 0) - 
          (data.images.find(img => img.image_url === b)?.image_order || 0)
        ) || [],
        category: data.category?.name || 'Unknown',
        client_name: data.client?.name || data.client_name,
        year: data.year,
        technologies: data.tech_stack?.map(tech => tech.tech_stack?.tech_name).filter(Boolean) || [],
        project_url: data.website_url,
        github_url: data.github_url,
        demo_url: data.demo_url,
        featured: data.featured || false,
        status: data.project_status || 'published',
        created_at: data.created_at,
        updated_at: data.updated_at,
        // Additional fields from the database
        project_location: data.project_location,
        stories: data.stories?.sort((a, b) => a.story_order - b.story_order) || [],
        highlights: data.highlights || []
      }

      console.log('✅ Portfolio by ID fetched:', transformedData)
      return transformedData
      
    } catch (error) {
      console.error('❌ PortfolioService.getPortfolioBySlug error:', error)
      throw error
    }
  }

  // Helper method to get tech stack IDs by names
  async getTechStackIdsByName(techNames) {
    try {
      const { data, error } = await this.supabase
        .from('tech_stack')
        .select('id')
        .in('tech_name', techNames)

      if (error) {
        console.error('❌ Error fetching tech stack IDs:', error)
        return []
      }

      return data.map(item => item.id)
    } catch (error) {
      console.error('❌ Error in getTechStackIdsByName:', error)
      return []
    }
  }

  // Other methods remain the same but use the new structure
  async getPortfolioByCategory(categoryName) {
    try {
      console.log(' Fetching portfolio by category:', categoryName)
      
      const { data, error } = await this.supabase
        .from('projects')
        .select(`
          *,
          category:project_categories(name),
          client:clients(name),
          tech_stack:project_tech_stack(
            tech_stack:tech_stack(tech_name, tech_category)
          ),
          images:project_images(image_url, image_title, image_order)
        `)
        .eq('project_categories.name', categoryName)
        .eq('project_status', 'published')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase error fetching portfolio by category:', error)
        throw new Error(error.message || 'Failed to fetch portfolio by category')
      }

      // Transform data to match expected format
      const transformedData = data.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        short_description: item.short_description,
        description: item.description,
        cover_image: item.cover_image,
        gallery_images: item.images?.map(img => img.image_url).sort((a, b) => 
          (item.images.find(img => img.image_url === a)?.image_order || 0) - 
          (item.images.find(img => img.image_url === b)?.image_order || 0)
        ) || [],
        category: item.category?.name || 'Unknown',
        client_name: item.client?.name || item.client_name,
        year: item.year,
        technologies: item.tech_stack?.map(tech => tech.tech_stack?.tech_name).filter(Boolean) || [],
        project_url: item.website_url,
        github_url: item.github_url,
        demo_url: item.demo_url,
        featured: item.featured || false,
        status: item.project_status || 'published',
        created_at: item.created_at,
        updated_at: item.updated_at
      }))

      console.log('✅ Portfolio by category fetched:', transformedData)
      return transformedData || []
      
    } catch (error) {
      console.error('❌ PortfolioService.getPortfolioByCategory error:', error)
      throw error
    }
  }

  async getFeaturedPortfolio() {
    try {
      console.log('🔍 Fetching featured portfolio...')
      
      const { data, error } = await this.supabase
        .from('projects')
        .select(`
          *,
          category:project_categories(name),
          client:clients(name),
          tech_stack:project_tech_stack(
            tech_stack:tech_stack(tech_name, tech_category)
          ),
          images:project_images(image_url, image_title, image_order)
        `)
        .eq('featured', true)
        .eq('project_status', 'published')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase error fetching featured portfolio:', error)
        throw new Error(error.message || 'Failed to fetch portfolio')
      }

      // Transform data to match expected format
      const transformedData = data.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        short_description: item.short_description,
        description: item.description,
        cover_image: item.cover_image,
        gallery_images: item.images?.map(img => img.image_url).sort((a, b) => 
          (item.images.find(img => img.image_url === a)?.image_order || 0) - 
          (item.images.find(img => img.image_url === b)?.image_order || 0)
        ) || [],
        category: item.category?.name || 'Unknown',
        client_name: item.client?.name || item.client_name,
        year: item.year,
        technologies: item.tech_stack?.map(tech => tech.tech_stack?.tech_name).filter(Boolean) || [],
        project_url: item.website_url,
        github_url: item.github_url,
        demo_url: item.demo_url,
        featured: item.featured || false,
        status: item.project_status || 'published',
        created_at: item.created_at,
        updated_at: item.updated_at
      }))

      console.log('✅ Featured portfolio fetched:', transformedData)
      return transformedData || []
      
    } catch (error) {
      console.error('❌ PortfolioService.getFeaturedPortfolio error:', error)
      throw error
    }
  }

  async searchPortfolio(query) {
    try {
      console.log('🔍 Searching portfolio:', query)
      
      const { data, error } = await this.supabase
        .from('projects')
        .select(`
          *,
          category:project_categories(name),
          client:clients(name),
          tech_stack:project_tech_stack(
            tech_stack:tech_stack(tech_name, tech_category)
          ),
          images:project_images(image_url, image_title, image_order)
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('project_status', 'published')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase error searching portfolio:', error)
        throw new Error(error.message || 'Failed to search portfolio')
      }

      // Transform data to match expected format
      const transformedData = data.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        short_description: item.short_description,
        description: item.description,
        cover_image: item.cover_image,
        gallery_images: item.images?.map(img => img.image_url).sort((a, b) => 
          (item.images.find(img => img.image_url === a)?.image_order || 0) - 
          (item.images.find(img => img.image_url === b)?.image_order || 0)
        ) || [],
        category: item.category?.name || 'Unknown',
        client_name: item.client?.name || item.client_name,
        year: item.year,
        technologies: item.tech_stack?.map(tech => tech.tech_stack?.tech_name).filter(Boolean) || [],
        project_url: item.website_url,
        github_url: item.github_url,
        demo_url: item.demo_url,
        featured: item.featured || false,
        status: item.project_status || 'published',
        created_at: item.created_at,
        updated_at: item.updated_at
      }))

      console.log('✅ Portfolio search results:', transformedData)
      return transformedData || []
      
    } catch (error) {
      console.error('❌ PortfolioService.searchPortfolio error:', error)
      throw error
    }
  }

  async updatePortfolioStatus(id, status) {
    try {
      console.log(' Updating portfolio status:', id, status)
      
      const { data, error } = await this.supabase
        .from('projects')
        .update({ project_status: status })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('❌ Supabase error updating portfolio status:', error)
        throw new Error(error.message || 'Failed to update portfolio status')
      }

      console.log('✅ Portfolio status updated:', data)
      return data
      
    } catch (error) {
      console.error('❌ PortfolioService.updatePortfolioStatus error:', error)
      throw error
    }
  }

  async toggleFeatured(id) {
    try {
      console.log(' Toggling portfolio featured status:', id)
      
      // First get current featured status
      const { data: current, error: fetchError } = await this.supabase
        .from('projects')
        .select('featured')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.error('❌ Supabase error fetching current status:', fetchError)
        throw new Error(fetchError.message || 'Failed to fetch current portfolio status')
      }

      // Toggle the featured status
      const newFeaturedStatus = !current.featured
      const { data, error } = await this.supabase
        .from('projects')
        .update({ featured: newFeaturedStatus })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('❌ Supabase error updating featured status:', error)
        throw new Error(error.message || 'Failed to update portfolio featured status')
      }

      console.log('✅ Portfolio featured status toggled:', data)
      return data
      
    } catch (error) {
      console.error('❌ PortfolioService.toggleFeatured error:', error)
      throw error
    }
  }
}

export default new PortfolioService()