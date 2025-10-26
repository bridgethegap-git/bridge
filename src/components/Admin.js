import React, { useState, useEffect, useCallback } from "react";
import "../styles/Admin.css";

function Admin() {
  // --- State Variables ---
  const [files, setFiles] = useState([]);
  const [section, setSection] = useState("programs");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});

  const API_BASE_URL = "https://bridge-server-zb9l.onrender.com";

  // --- Handlers for Input Changes ---
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setMessage("");
    if (selectedFiles.length > 0) {
      const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
      setMessage(`Selected: ${selectedFiles.length} file(s) (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
    }
  };

  const handleSectionChange = (e) => {
    const newSection = e.target.value;
    setSection(newSection);
    setTitle("");
    setDescription("");
    setName("");
    setLink("");
    setFiles([]);
    setMessage("");
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // --- Helper Function to Get Dynamic Labels ---
  const getFieldInfo = useCallback(() => {
    switch (section) {
      case "programs":
        return { 
          title: "Program Title", 
          description: "Program Description",
          multipleFiles: true,
          requiresTitle: true,
          requiresDescription: true
        };
      case "partners":
        return { 
          title: "Partner Name", 
          description: "Partner Description",
          multipleFiles: false,
          requiresTitle: true,
          requiresDescription: true
        };
      case "shop":
        return { 
          title: "Product Title",
          multipleFiles: false,
          requiresTitle: true,
          requiresDescription: false
        };
      case "social":
        return { 
          name: "Social Media Name",
          link: "URL Link",
          multipleFiles: false,
          requiresName: true,
          requiresLink: true
        };
      default:
        return { title: "Title", multipleFiles: false };
    }
  }, [section]);

  // --- File Upload Logic ---
  const handleUpload = async () => {
    const fieldInfo = getFieldInfo();

    // Input Validations
    if (!files || files.length === 0) {
      setMessage("❌ Please select a file first!");
      return;
    }

    // Check if all files are images
    const allImages = files.every(f => f.type.startsWith('image/'));
    if (!allImages) {
      setMessage("❌ Please select only image files!");
      return;
    }

    // Validation based on section
    if (fieldInfo.requiresTitle && !title.trim()) {
      setMessage(`❌ Please enter ${fieldInfo.title.toLowerCase()}`);
      return;
    }

    if (fieldInfo.requiresDescription && !description.trim()) {
      setMessage(`❌ Please enter ${fieldInfo.description.toLowerCase()}`);
      return;
    }

    if (fieldInfo.requiresName && !name.trim()) {
      setMessage(`❌ Please enter ${fieldInfo.name.toLowerCase()}`);
      return;
    }

    if (fieldInfo.requiresLink && !link.trim()) {
      setMessage(`❌ Please enter ${fieldInfo.link.toLowerCase()}`);
      return;
    }

    // Prepare Upload
    setIsUploading(true);
    setMessage("⏳ Uploading...");
    
    const formData = new FormData();
    
    // Add files based on section
    if (section === "programs") {
      files.forEach(file => {
        formData.append("images", file);
      });
      formData.append("title", title.trim());
      formData.append("description", description.trim());
    } else if (section === "social") {
      formData.append("icon", files[0]);
      formData.append("name", name.trim());
      formData.append("link", link.trim());
    } else if (section === "partners") {
      formData.append("image", files[0]);
      formData.append("title", title.trim());
      formData.append("description", description.trim());
    } else if (section === "shop") {
      formData.append("image", files[0]);
      formData.append("title", title.trim());
    }

    // Make API Call
    try {
      const endpoint = `${API_BASE_URL}/${section}/upload`;
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Upload successful! Item saved in "${section}" section.`);
        
        // Add new item to list
        const newItem = data.program || data.partner || data.shopItem || data.socialLink;
        if (newItem) {
          setItems(prevItems => [newItem, ...prevItems]);
        }

        // Clear form fields
        setFiles([]);
        setTitle("");
        setDescription("");
        setName("");
        setLink("");
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }

        // Refresh stats
        loadStats();
      } else {
        setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed: Network error. Make sure the server is running.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- Fetching Items ---
  const loadItems = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/${section}`);
      if (!res.ok) {
        if (res.status === 404) {
          setItems([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      
      // Extract items based on section
      const itemsArray = data.programs || data.partners || data.shopItems || data.socialLinks || [];
      setItems(itemsArray);
    } catch (err) {
      console.error("Error loading items:", err);
      setItems([]);
    }
  }, [section]);

  // --- Fetching Upload Statistics ---
  const loadStats = useCallback(async () => {
    try {
      const sections = ["programs", "partners", "shop", "social"];
      const newStats = {};
      
      for (const sec of sections) {
        try {
          const res = await fetch(`${API_BASE_URL}/${sec}`);
          if (res.ok) {
            const data = await res.json();
            const itemsArray = data.programs || data.partners || data.shopItems || data.socialLinks || [];
            newStats[sec] = itemsArray.length;
          }
        } catch (err) {
          console.error(`Error loading stats for ${sec}:`, err);
        }
      }
      
      setStats(newStats);
    } catch (err) {
      console.error("Error loading stats:", err);
      setStats({});
    }
  }, []);

  // --- Deleting an Item ---
  const deleteItem = async (itemId, displayName) => {
    if (!window.confirm(`Are you sure you want to delete "${displayName}"?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${section}/${itemId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ "${displayName}" deleted successfully!`);
        setItems(prevItems =>
          prevItems.filter(item => item._id !== itemId)
        );
        loadStats();
      } else {
        setMessage(`❌ Delete failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Delete failed: Network error.");
    }
  };

  // --- Effect Hooks ---
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Get field info
  const fieldInfo = getFieldInfo();

  // Section names mapping
  const sectionNames = {
    "programs": "Programs/Gallery",
    "partners": "Partners",
    "shop": "Shop",
    "social": "Social Links"
  };

  // --- JSX Rendering ---
  return (
    <div className="admin-container">
      <h2 className="admin-title">📁 Bridge The Gap - Admin Dashboard</h2>
      
      {/* Stats Display */}
      <div className="stats-section">
        <h3 className="stats-title">📊 Items Count:</h3>
        {Object.keys(stats).length > 0 ? (
          <div className="stats-grid">
            {Object.entries(stats).map(([key, count]) => (
              <div key={key} className="stat-card">
                <strong>{sectionNames[key] || key}:</strong> {count} item(s)
              </div>
            ))}
          </div>
        ) : (
          <p className="no-stats">Statistics not available. Try uploading files!</p>
        )}
      </div>

      {/* Upload Form */}
      <div className="upload-form">
        <h3 className="form-title">📤 Add New Item</h3>
        
        <div className="form-group">
          <label className="form-label">Section:</label>
          <select
            value={section}
            onChange={handleSectionChange}
            disabled={isUploading}
            className="form-select"
          >
            <option value="programs">📸 Programs/Gallery</option>
            <option value="partners">🤝 Partners</option>
            <option value="shop">🛍️ Shop</option>
            <option value="social">🔗 Social Links</option>
          </select>
        </div>

        {section !== "social" && (
          <div className="form-group">
            <label className="form-label">{fieldInfo.title}:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUploading}
              className="form-input"
              placeholder={`Enter ${fieldInfo.title.toLowerCase()}`}
              maxLength={100}
            />
          </div>
        )}

        {fieldInfo.requiresDescription && (
          <div className="form-group">
            <label className="form-label">{fieldInfo.description}:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
              className="form-textarea"
              placeholder={`Enter ${fieldInfo.description.toLowerCase()}`}
              maxLength={2000}
            />
          </div>
        )}

        {section === "social" && (
          <>
            <div className="form-group">
              <label className="form-label">{fieldInfo.name}:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="e.g., Facebook, Instagram, Twitter"
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{fieldInfo.link}:</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={isUploading}
                className="form-input"
                placeholder="https://example.com"
                maxLength={500}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label className="form-label">
            Select Image{fieldInfo.multipleFiles ? 's' : ''}: 
            {fieldInfo.multipleFiles && <span className="label-note"> (multiple allowed)</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple={fieldInfo.multipleFiles}
            onChange={handleFileChange}
            disabled={isUploading}
            className="form-file-input"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading || files.length === 0}
          className={`upload-button ${isUploading || files.length === 0 ? 'disabled' : ''}`}
        >
          {isUploading ? '⏳ Uploading...' : '📤 Upload'}
        </button>

        {message && (
          <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Items List Display */}
      <div className="items-section">
        <h3 className="items-title">
          🖼️ {sectionNames[section]} Items ({items.length})
        </h3>
        
        {items.length > 0 ? (
          <div className="items-grid">
            {items.map((item) => {
              const displayTitle = item.title || item.name || "Untitled";
              const displayDescription = item.description || '';
              const imageUrl = section === "programs" 
                ? (item.images && item.images[0] ? item.images[0].cloudinaryUrl : '')
                : item.cloudinaryUrl;
              
              return (
                <div key={item._id} className="item-card">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={displayTitle}
                      className="item-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.warn(`Failed to load image: ${imageUrl}`);
                      }}
                    />
                  )}
                  
                  <div className="item-content">
                    <h4 className="item-title">{displayTitle}</h4>
                    
                    {section === "programs" && item.images && (
                      <p className="item-image-count">
                        📸 {item.images.length} image(s)
                      </p>
                    )}
                    
                    {displayDescription && (
                      <p className="item-description">
                        {displayDescription.length > 150
                          ? `${displayDescription.substring(0, 150)}...`
                          : displayDescription
                        }
                      </p>
                    )}
                    
                    {section === "social" && item.link && (
                      <p className="item-link">
                        🔗 <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                      </p>
                    )}

                    <button
                      onClick={() => deleteItem(item._id, displayTitle)}
                      className="delete-button"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-items">
            No items uploaded yet in "{sectionNames[section]}" section.
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;