'use client'
import CategoryComboBox from './CategoryComboBox'
import { ChangeEvent, useRef, useState } from 'react'
import { cookies } from 'next/headers'

export default function AddProductForm() {
  const [productName, setProductName] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('1')
  const [productDescription, setProductDescription] = useState<string>('')
  const [productBasePrice, setProductBasePrice] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageUpload, setImageUpload] = useState<boolean>(false)
  const [uploadUrl, setUploadUrl] = useState<string>('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [previewImg, setPreviewImg] = useState<string>(
    'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon.png',
  )

  const handleCategoryChange = (categoryId: string) => {
    setCategoryId(categoryId)
  }

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageUpload(event.target.value === 'true' ? true : false)
  }

  const handleUploadUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadUrl(event.target.value)
  }

  const handleUploadImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    setUploadFile(selectedFile)
    if (selectedFile) {
      setPreviewImg(URL.createObjectURL(selectedFile))
    }
  }

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="m-3">
          <p className="font-bold">
            Tên sản phẩm<span className="ms-1 text-red-500">*</span>
          </p>
          <input
            type="text"
            className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
            placeholder="VD: iPhone..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          {/* <span className="text-sm font-medium text-red-500"></span> */}
        </div>
        <div className="m-3">
          <p className="font-bold">Mô tả</p>
          <input
            type="text"
            className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="m-3">
          <p className="font-bold">
            Danh mục<span className="ms-1 text-red-500">*</span>
          </p>
          <CategoryComboBox defaultId={categoryId} onCategoryChange={handleCategoryChange} />
        </div>
        <div className="m-3">
          <p className="font-bold">
            Giá<span className="ms-1 text-red-500">*</span>
          </p>
          <input
            type="number"
            className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
            onChange={(e) => setProductBasePrice(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="m-3">
          <p className="font-bold">Ảnh sản phẩm</p>
          <div className="flex items-center justify-around lg:justify-center">
            <div className="flex items-center justify-center py-3 lg:me-3">
              <input
                type="radio"
                name="uploadType"
                value="false"
                onChange={handleTypeChange}
                checked={imageUpload === false}
                className="h-6 w-6"
              />
              <label className="ms-1 font-semibold">Sử dụng URL</label>
            </div>
            <div className="flex items-center justify-center py-3 lg:ms-3">
              <input
                type="radio"
                name="uploadType"
                value="true"
                onChange={handleTypeChange}
                checked={imageUpload === true}
                className="h-6 w-6"
              />
              <label className="ms-1 font-semibold">Tải File</label>
            </div>
          </div>
          {imageUpload ? (
            <div className="flex items-center justify-center">
              <div
                onClick={() => {
                  fileInputRef.current?.click()
                }}
                className="flex h-[300px] w-[300px] cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-200"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImageFile}
                  ref={fileInputRef}
                  className="hidden"
                />
                <img className="object-contain" src={previewImg} />
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Nhập đường dẫn ảnh đã tồn tại trong CSDL. VD: http://binhan.io.vn/img..."
                onChange={handleUploadUrlChange}
                className="min-h-[38] w-full rounded-[4] border border-[#cccccc] bg-white p-1 focus-visible:outline-[#2684FF]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="mb-3 bg-yellow-300 px-3 py-1 font-semibold uppercase shadow-lg hover:bg-yellow-400 hover:shadow-sm">
          Thêm
        </button>
      </div>
    </>
  )
}
