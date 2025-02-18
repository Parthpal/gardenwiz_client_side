/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import { UsefetchCategories } from '@/src//hooks/categories.hook';
import { UseGetPosts } from '@/src//hooks/post.hook';
import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend,BarChart, Bar, ResponsiveContainer } from 'recharts';

const PostPerMonth = () => {

  const [chartData, setChartData] = useState([]);

  const { data: categoriesData } = UsefetchCategories();
  const { data: postData } = UseGetPosts();
  
  useEffect(() => {
    // Ensure both categoriesData and postData exist before proceeding
    if (!categoriesData?.data || !postData?.data) return;
  
    //Map category IDs to category names
    const categoryMap = categoriesData.data.reduce((acc, cat) => {
      acc[cat._id] = cat.name;
      return acc;
    }, {});
  
    // Process Post Data & Group by Category Name
    const groupedData = postData.data.reduce((acc, post) => {
      const categoryName = categoryMap[post.categoryID] || "Unknown";
  
      if (!acc[categoryName]) {
        acc[categoryName] = { name: categoryName, upvotes: 0, downvotes: 0 };
      }
  
      acc[categoryName].upvotes += post.upvotes;
      acc[categoryName].downvotes += post.downvotes;
  
      return acc;
    }, {});
  
    setChartData(Object.values(groupedData));
  }, [categoriesData, postData]); // ✅ Run effect when data updates
    return (
      <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="upvotes" fill="#4CAF50" name="Upvotes" />
        <Bar dataKey="downvotes" fill="#F44336" name="Downvotes" />
      </BarChart>
    </ResponsiveContainer>
    );
};

export default PostPerMonth;