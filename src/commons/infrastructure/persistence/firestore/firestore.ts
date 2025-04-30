// Interfaces 
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { IDocumentBasedDatabaseAdapter, DocumentBasedDatabaseResponse } from '@commons/domain/interfaces/persistence.interface'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue, FieldPath } from 'firebase-admin/firestore'

export default class FirestoreAdapter implements IDocumentBasedDatabaseAdapter {

  private firebaseApp

  private db
  
  constructor (private logger: ILogger, projectId: string, instanceName: string) {

    this.firebaseApp = initializeApp({
      projectId
    },
    instanceName
    )

    this.db = getFirestore(this.firebaseApp)

  }

  async getDataDocumentFromCollection (collectionId, documentId): Promise<DocumentBasedDatabaseResponse> {

    const doc = await this.db.collection(collectionId).doc(documentId)
    const snapshot = await doc.get()

    let dataResponse = null

    if (snapshot.exists) {
      dataResponse = snapshot.data()
    }

    return <DocumentBasedDatabaseResponse>{
      data: dataResponse,
      error: null
    }
  }

  /**
   * Recupera todos los documentos de una coleccion
   * @param collectionId string nombre de la coleccion
   * @returns DocumentBasedDatabaseResponse [IMPORTANTE Aplicar mapper de dominio]
   */
  async getDocumentsFromCollection (collectionId: string): Promise<DocumentBasedDatabaseResponse> {
    try {
      const snapshot = await this.db.collection(collectionId).get()
      const documents = snapshot.docs.map(
        doc => doc.data())
  
      return <DocumentBasedDatabaseResponse>{
        data: documents,
        error: null
      }
    } catch (error) {
      this.logger.error(`[Adapter][Persistence][${this.constructor.name}][getDocumentsFromCollection] ${error}`)
      return <DocumentBasedDatabaseResponse>{
        data: null,
        error: error
      }
    }
  }

  async getDocumentsFromCollectionUsingOrder (collectionId: string, fieldNameToOrder: string): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await this.db.collection(collectionId).orderBy(fieldNameToOrder).get()

    return <DocumentBasedDatabaseResponse>{
      data: snapshot,
      error: null
    }
  }

  async getDataDocumentsFromCollectionWhere (collectionId, fieldWhere: string, operatorWhere: string, valueWhere: string[]): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await this.db.collection(collectionId).where(fieldWhere, operatorWhere, valueWhere).get()

    return <DocumentBasedDatabaseResponse>{
      data: snapshot,
      error: null
    }
  }

  async getDataFromDocument (doc): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await doc.get()

    let dataResponse = null

    if (snapshot.exists) {
      dataResponse = snapshot.data()
    }

    return <DocumentBasedDatabaseResponse>{
      data: dataResponse,
      error: null
    }

  }

  async getDataCollectionFromDocument (doc, subCollectionId, fieldOrder, valueOrder, limit): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await doc.collection(subCollectionId).orderBy(fieldOrder, valueOrder).limit(limit).get()

    const dataResponse = snapshot.docs.map(doc => {
      const resp = doc.data()
      resp.id = doc.id
      return resp
    }
    )

    return <DocumentBasedDatabaseResponse>{
      data: dataResponse,
      error: null
    }

  }

  async getDocumentFromCollection (collectionId, documentId): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await this.db.collection(collectionId).doc(documentId)

    return <DocumentBasedDatabaseResponse>{
      data: snapshot,
      error: null
    }
  }

  async getDocumentFromSubCollection (collectionId, documentId, subCollectionId): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await this.db.collection(collectionId).doc(documentId).collection(subCollectionId).get()

    return <DocumentBasedDatabaseResponse>{
      data: snapshot,
      error: null
    }

  }

  async getDocumentFromSubCollectionWhere (collectionId, documentId, subCollectionId, documentIdSubCollection): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await this.db.collection(collectionId).doc(documentId).collection(subCollectionId)
      .where(FieldPath.documentId(), '==', documentIdSubCollection.toString()).get()

    let dataResponse = null

    if (!snapshot.empty) {
      dataResponse = snapshot.docs[0].data()
    }

    return <DocumentBasedDatabaseResponse>{
      data: dataResponse,
      error: null
    }

  }

  async getDocumentsWithFilters (collectionId, filters, limit?: number): Promise<DocumentBasedDatabaseResponse> {

    let query = this.db.collection(collectionId)

    for (const filter of filters) {
      query = query.where(filter.field, filter.operator, filter.value)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const snapshot = await query.get()

    return <DocumentBasedDatabaseResponse>{
      data: snapshot,
      error: null
    }
  }

  async getDocumentsFromSubCollectionWithFilters (collectionId, documentId, subCollectionId, filters): Promise<DocumentBasedDatabaseResponse> {

    let query = this.db.collection(collectionId).doc(documentId).collection(subCollectionId)

    for (const filter of filters) {
      query = query.where(filter.field, filter.operator, filter.value)
    }

    const snapshot = await query.get()

    return <DocumentBasedDatabaseResponse>{
      data: snapshot,
      error: null
    }
  }

  async getDocumentsFromSubCollectionByOrder (collectionId, documentId, subCollectionId, fieldOrder, valueOrder, limit): Promise<DocumentBasedDatabaseResponse> {

    const snapshot = await this.db.collection(collectionId).doc(documentId).collection(subCollectionId).orderBy(fieldOrder, valueOrder).limit(limit).get()

    const dataResponse = snapshot.docs.map(doc => doc.data())

    return <DocumentBasedDatabaseResponse>{
      data: dataResponse,
      error: null
    }
  }

  async addDocumentToCollection (collectionId, documentId, document): Promise<DocumentBasedDatabaseResponse> {

    if (documentId != null && documentId !== undefined) {
      try {
        const collectionRef = await this.db.collection(collectionId)
        // set time to document
        document.createdAt = new Date()
        const documentRef = await collectionRef.doc(documentId).set(document)

        return <DocumentBasedDatabaseResponse>{
          data: documentRef,
          error: null
        }
      } catch (error) {
        return <DocumentBasedDatabaseResponse>{
          data: null,
          error: error
        }
      }
    } else {
      try {
        const collectionRef = await this.db.collection(collectionId)
        // set time to document
        document.createdAt = new Date()
        const documentRef = await collectionRef.add(document)

        return <DocumentBasedDatabaseResponse>{
          data: documentRef,
          error: null
        }
      } catch (error) {
        return <DocumentBasedDatabaseResponse>{
          data: null,
          error: error
        }
      }
    }
  }

  async updateDocumentField (
    collectionId: string,
    documentId: string,
    document: any): Promise<DocumentBasedDatabaseResponse> {
    const doc = await this.db.collection(collectionId).doc(documentId)
    const snapshot = await doc.get()
  
    if (!snapshot.exists) {
      const error = 'No existe el documento que se intentó modificar'
      this.logger.error(`[Adapter][Persistence][${this.constructor.name}][updateDocumentField] ${error}`)
      throw new Error(`${error}`)
    }
  
    // Función para limpiar el objeto de valores undefined
    const cleanDocument = (obj: any) => {
      return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))
    }
  
    try {
      const cleanedDocument = cleanDocument(document)
      const res: DocumentBasedDatabaseResponse = await doc.update(cleanedDocument, { ignoreUndefinedProperties: true })
      if (res.error) throw new Error(res.error)
  
      return <DocumentBasedDatabaseResponse>{
        data: res,
        error: null
      }
    } catch (error) {
      this.logger.error(`[Adapter][Persistence][${this.constructor.name}][updateDocumentField] ${error}`)
      return <DocumentBasedDatabaseResponse>{
        data: null,
        error: error
      }
    }
  }

  async addValueInArrayFieldOfDocument (collectionId, documentId, fieldName, value): Promise<void> {

    const doc = await this.db.collection(collectionId).doc(documentId)
    const snapshot = await doc.get()

    if (!snapshot.exists) {

      const error = 'No existe el documento que se intentó modificar'
      this.logger.error(`[Adapter][Persistence][${this.constructor.name}][addValueInArrayFieldOfDocument] ${error}`)
      throw new Error(`${error}`)
    }

    const dateUpdate = {}
    dateUpdate[fieldName] = FieldValue.arrayUnion(value)

    await doc.update(dateUpdate)

  }

  async getDocumentReference (collectionId: string, documentId: string): Promise<DocumentBasedDatabaseResponse<any>> {
        
    return <DocumentBasedDatabaseResponse>{
      data: this.db.collection(collectionId).doc(documentId),
      error: null
    }
  }

  async updateFieldValueInArrayElement (collectionId: string, documentId: string, arrayFieldName: string, itemToUpdate: any, fieldToUpdate: string, value: string): Promise<void> {
    
    const doc = await this.db.collection(collectionId).doc(documentId)
    const snapshot = await doc.get()
  
    if (!snapshot.exists) {
      const error = 'No existe el documento que se intentó modificar'
      this.logger.error(`[Adapter][Persistence][${this.constructor.name}][updateFieldValueInArrayElement] ${error}`)
      throw new Error(`${error}`)
    }
  
    const docData = snapshot.data()

    const itemIndex = docData[arrayFieldName].findIndex(item => {
      return JSON.stringify(item) === JSON.stringify(itemToUpdate)
    })
  
    if (itemIndex !== -1) {
      docData[arrayFieldName][itemIndex][fieldToUpdate] = value
      await doc.update(docData)
    } else {
      throw new Error(`[Adapter][Persistence][${this.constructor.name}][updateFieldValueInArrayElement] No se encontró el item en el array.`)
    }
  }

  async updateSpecificMapFieldInDocument_old (collectionId: string, documentId: string, mapFieldName: string, newMapValue: any): Promise<void> {
        
    const doc = await this.db.collection(collectionId).doc(documentId)
    const snapshot = await doc.get()
  
    if (!snapshot.exists) {
      const error = 'No existe el documento que se intentó modificar'
      this.logger.error(`[Adapter][Persistence][${this.constructor.name}][updateSpecificMapField] ${error}`)
      throw new Error(`${error}`)
    }
  
    const updateObject = {}
    updateObject[mapFieldName] = newMapValue
  
    await doc.update(updateObject)

  }

  async updateSpecificMapFieldInDocument (collectionId: string, documentId: string, mapFieldName: string, newMapValue: any, specificField?: string, fieldValue?: any): Promise<void> {
        
    const doc = await this.db.collection(collectionId).doc(documentId)
    const snapshot = await doc.get()
  
    if (!snapshot.exists) {
      const error = 'No existe el documento que se intentó modificar'
      this.logger.error(`[Adapter][Persistence][${this.constructor.name}][updateSpecificMapField] ${error}`)
      throw new Error(`${error}`)
    }
  
    const updateObject = {}
    if (specificField && fieldValue !== undefined) {
      updateObject[`${mapFieldName}.${specificField}`] = fieldValue
    } else {
      updateObject[mapFieldName] = newMapValue
    }
  
    await doc.update(updateObject)
  }

}
