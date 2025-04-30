export interface DocumentBasedDatabaseResponse<T = any> {
  data?: T;
  error?: string;
}
  
// Permite facilidad para simular el storage y poder realizar testing mockeando datos.
export interface IDocumentBasedDatabaseAdapter {

  getDataDocumentFromCollection(collectionId: string, documentId: string): Promise<DocumentBasedDatabaseResponse>;

  getDocumentsFromCollection(collectionId: string): Promise<DocumentBasedDatabaseResponse>;

  getDocumentsFromCollectionUsingOrder(collectionId: string, fieldNameToOrder: string): Promise<DocumentBasedDatabaseResponse>;

  getDataDocumentsFromCollectionWhere(collectionId: string, fieldWhere: string, operatorWhere: string, valueWhere: string[]): Promise<DocumentBasedDatabaseResponse>;

  getDataFromDocument(doc: any): Promise<DocumentBasedDatabaseResponse>;

  getDataCollectionFromDocument(doc: any, subCollectionId: string, fieldOrder: string, valueOrder: string, limit: number): Promise<DocumentBasedDatabaseResponse>;

  getDocumentFromCollection(collectionId: string, documentId: string): Promise<DocumentBasedDatabaseResponse>;

  getDocumentFromSubCollection(collectionId: string, documentId: string, subCollectionId: string): Promise<DocumentBasedDatabaseResponse>;

  getDocumentFromSubCollectionWhere(collectionId: string, documentId: string, subCollectionId: string, documentIdSubCollection: string): Promise<DocumentBasedDatabaseResponse>;

  getDocumentsWithFilters(collectionId: string, filters: Array<{ field: string, operator: string, value: any }>, limit?: number): Promise<DocumentBasedDatabaseResponse>;

  getDocumentsFromSubCollectionWithFilters(collectionId: string, documentId: string, subCollectionId: string, filters: Array<{ field: string, operator: string, value: any }>): Promise<DocumentBasedDatabaseResponse>;

  getDocumentsFromSubCollectionByOrder(collectionId: string, documentId: string, subCollectionId: string, fieldOrder: string, valueOrder: string, limit: number): Promise<DocumentBasedDatabaseResponse>;
    
  addDocumentToCollection(collectionId: string, documentId: string | null | undefined, document: any): Promise<DocumentBasedDatabaseResponse>;

  updateDocumentField(collectionId: string, documentId: string, document: any): Promise<DocumentBasedDatabaseResponse>;

  addValueInArrayFieldOfDocument(collectionId: string, documentId: string, fieldName: string, value: any): Promise<void>;

  getDocumentReference(collectionId: string, documentId: string): Promise<DocumentBasedDatabaseResponse>;

  updateFieldValueInArrayElement(collectionId: string, documentId: string, arrayFieldName: string, itemToUpdate: any, fieldToUpdate: string, value: string): Promise<void>;

  updateSpecificMapFieldInDocument(collectionId: string, documentId: string, mapFieldName: string, newMapValue: any, specificField?: string, fieldValue?: any): Promise<void>

}
